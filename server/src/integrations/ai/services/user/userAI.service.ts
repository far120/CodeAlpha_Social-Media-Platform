import User from "../../../../modules/users/user.model";

export const analyzeUser = async (userId: string) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  // Calculate completeness score
  let score = 30; // base score for registered account
  if (user.firstName && user.lastName) score += 20;
  if (user.email) score += 15;
  if (user.phone) score += 10;
  if (user.address) score += 10;
  if (user.avatar && !user.avatar.includes("ui-avatars.com")) score += 10;
  if (user.bio) score += 5;

  score = Math.min(score, 100);

  const statusText = user.isBlocked ? "Blocked" : "Active";
  const verificationText = user.isVerified ? "Verified" : "Unverified";
  const fullName = `${user.firstName} ${user.lastName}`.trim();

  const summary = `${fullName} is an ${statusText.toLowerCase()} user with ${verificationText.toLowerCase()} credentials and the role of ${user.role}. The profile is ${score}% complete with ${user.phone ? "verified phone," : "missing phone,"} ${user.address ? "valid address," : "no address,"} and ${user.bio ? "a custom bio." : "no bio yet."}`;

  const analysisResult = {
    summary,
    analysis: {
      Summary: summary,
      Score: score,
      Name: fullName,
      Role_Tier: user.role,
      Verification_Status: verificationText,
      Access_Status: statusText,
      Profile_Completeness_Details: `Completeness evaluated at ${score}%.`,
    },
  };

  await User.findByIdAndUpdate(userId, { summary: analysisResult });

  return analysisResult;
};


export default {
    analyzeUser
};