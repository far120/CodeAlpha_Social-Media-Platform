import Iuser from "./user.types";
import { UserRole } from "./user.types";
import User from "./user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import AppError from "../../core/errors/AppError";
import APIFeatures from "../../core/utils/apiFeatures";
// import { analyzeUser } from "../../integrations/ai/services/user/userAI.service";
export const registerService = async (user: Iuser) => {
    user.role="user";
    user.summary = "Not uploaded yet";
    const createUser = await User.create(user);  
    // const summary = await analyzeUser(createUser._id.toString());
    // const updateSummary = await User.findByIdAndUpdate(createUser._id, { summary });
    return createUser;  
}


export const logInService = async (user: Iuser) => {
    const findUser = await User.findOne({email: user.email}).select("+password");
    if(!findUser || !findUser.password){
        throw new AppError("User not found", 404);
    }
    if(findUser.isBlocked){
        throw new AppError("User is blocked", 401);
    }

    const isMatch = await bcrypt.compare(user.password!, findUser.password);
    if(!isMatch){
        throw new AppError("Invalid password", 401);
    }
    const token = jwt.sign({ id: findUser._id , role: findUser.role , firstname: findUser.firstName , lastname: findUser.lastName }, process.env.JWT_SECRET!, { expiresIn: "1h" });
    return {findUser, token};
}


export const changePasswordService = async (id: string, data: { oldPassword: string; newPassword: string }) => {
    const findUser = await User.findById(id).select("+password");
    if(!findUser || !findUser.password){
        throw new AppError("User not found", 404);
    }
    const isMatch = await bcrypt.compare(data.oldPassword, findUser.password);
    if(!isMatch){
        throw new AppError("Invalid password", 401);
    }
    const hashedPassword = await bcrypt.hash(data.newPassword, 10);
    const updatePassword = await User.findByIdAndUpdate(findUser._id, { password: hashedPassword }, { new: true });
    return updatePassword;
}


export const getAllUsersService = async (queryString: Record<string, any>) => {
  const features = new APIFeatures(
    User.find().select("-password"),
    queryString
  )
    .filter()
    .sort()
    .search(["firstName", "lastName", "username", "email", "role", "phone", "address"]);

  await features.paginate();

  const users = await features.query;
  const pagination = features.pagination;

  return {users, pagination};
};

export const searchUsersService = async (queryTerm: string) => {
  if (!queryTerm || !queryTerm.trim()) {
    return [];
  }
  const rawKeyword = queryTerm.trim();
  const orConditions: any[] = [
    { firstName: { $regex: rawKeyword, $options: "i" } },
    { lastName: { $regex: rawKeyword, $options: "i" } },
    { username: { $regex: rawKeyword, $options: "i" } },
    { email: { $regex: rawKeyword, $options: "i" } },
    {
      $expr: {
        $regexMatch: {
          input: { $concat: ["$firstName", " ", "$lastName"] },
          regex: rawKeyword,
          options: "i",
        },
      },
    },
    {
      $expr: {
        $regexMatch: {
          input: { $concat: ["$firstName", "$lastName"] },
          regex: rawKeyword,
          options: "i",
        },
      },
    },
  ];

  const tokens = rawKeyword.split(/\s+/).filter(Boolean);
  if (tokens.length >= 2) {
    orConditions.push({
      $and: tokens.map((token: string) => ({
        $or: [
          { firstName: { $regex: token, $options: "i" } },
          { lastName: { $regex: token, $options: "i" } },
          { username: { $regex: token, $options: "i" } },
          { email: { $regex: token, $options: "i" } },
        ],
      })),
    });
  }

  const users = await User.find({ $or: orConditions })
    .select("firstName lastName username email avatar bio role isVerified")
    .limit(10);

  return users;
};

export const getMeService = async (id: string) => {
    const findUser = await User.findById(id).select("-password");
    if(!findUser){
        throw new AppError("User not found", 404);
    }
    return findUser;
}   

export const updateUserService = async (id: string, data: Iuser) => {
    const findUser = await User.findByIdAndUpdate(id, data, { new: true });
    if(!findUser){
        throw new AppError("User not found", 404);
    }
    // const summary = await analyzeUser(findUser._id.toString());
    // const updateSummary = await User.findByIdAndUpdate(findUser._id, { summary });
    return findUser;
}

export const deleteUserService = async (id: string) => {
    const findUser = await User.findByIdAndDelete(id);
    if(!findUser){
        throw new AppError("User not found", 404);
    }
    return findUser;
}


export const blockUserService = async (id: string) => {
    const user = await User.findById(id);
    if(!user){
        throw new AppError("User not found", 404);
    }
    const findUser = await User.findByIdAndUpdate(id, { isBlocked: !user.isBlocked }, { new: true });
    if(!findUser){
        throw new AppError("User not found", 404);
    }
    // const summary = await analyzeUser(findUser._id.toString());
    // const updateSummary = await User.findByIdAndUpdate(findUser._id, { summary });
    return findUser;
}

export const roleOfUserService = async (id: string , role: UserRole) => {
    const findUser = await User.findById(id);
    if(!findUser){
        throw new AppError("User not found", 404);
    }
    const updateRole = await User.findByIdAndUpdate(id, { role }, { new: true });
    if(!updateRole){
        throw new AppError("User not found", 404);
    }
    // const summary = await analyzeUser(updateRole._id.toString());
    // const updateSummary = await User.findByIdAndUpdate(updateRole._id, { summary });
    return findUser;
}

export const createuserServicebySuperAdmin = async (user: Iuser) => {
     user.summary = "Not uploaded yet";
    const createUser = await User.create(user);  
    // const summary = await analyzeUser(createUser._id.toString());
    // const updateSummary = await User.findByIdAndUpdate(createUser._id, { summary });
    
    return createUser;  
}   

export const toggleFollowService = async (currentUserId: string, targetUserId: string) => {
  if (currentUserId === targetUserId) {
    throw new AppError("You cannot follow yourself", 400);
  }

  const currentUser = await User.findById(currentUserId);
  const targetUser = await User.findById(targetUserId);

  if (!currentUser || !targetUser) {
    throw new AppError("User not found", 404);
  }

  const isFollowing = currentUser.following?.some(
    (id) => id.toString() === targetUserId.toString()
  );

  if (isFollowing) {
    await User.findByIdAndUpdate(currentUserId, { $pull: { following: targetUserId } });
    await User.findByIdAndUpdate(targetUserId, { $pull: { followers: currentUserId } });
    return { isFollowing: false, message: "Unfollowed user successfully" };
  } else {
    await User.findByIdAndUpdate(currentUserId, { $addToSet: { following: targetUserId } });
    await User.findByIdAndUpdate(targetUserId, { $addToSet: { followers: currentUserId } });
    return { isFollowing: true, message: "Followed user successfully" };
  }
};

export const getUserProfileService = async (userId: string) => {
  const user = await User.findById(userId)
    .select("-password")
    .populate("followers", "firstName lastName avatar email")
    .populate("following", "firstName lastName avatar email")
    .populate({
      path: "posts",
      select: "user title content image likes comments createdAt updatedAt",
    })
    .populate("posts.user", "firstName lastName avatar email");

  if (!user) {
    throw new AppError("User not found", 404);
  }

  return user;
};




   