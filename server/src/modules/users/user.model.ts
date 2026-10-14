import mongoose from "mongoose";
import bcrypt from "bcrypt";
import Iuser from "./user.types";

const userSchema = new mongoose.Schema<Iuser>(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },

    lastName: {
      type: String,
      required: true,
      trim: true,
    },

    username: {
      type: String,
      trim: true,
      lowercase: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    phone: {
      type: String,
      trim: true,
    },

    address: {
      type: String,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      select: false,
    },

    role: {
      type: String,
      enum: ["user", "admin", "super-admin", "business-manager"],
      default: "user",
    },

    isVerified: {
      type: Boolean,
      default: true,
    },

    isBlocked: {
      type: Boolean,
      default: false,
    },

    avatar: {
      type: String,
      default: "",
    },

    bio: {
      type: String,
      default: "",
      maxlength: 500,
    },

    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
      },
    ],

    summary: {
      type: Object,
      default: null,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function () {
  if (this.isModified("password") && this.password) {
    this.password = await bcrypt.hash(this.password, 10);
  }

  if (!this.username) {
    const baseName = `${this.firstName || ""}${this.lastName || ""}`.toLowerCase().replace(/[^a-z0-9]/g, "");
    this.username = baseName || (this.email ? this.email.split("@")[0].toLowerCase().replace(/[^a-z0-9]/g, "") : "user");
  }

  if (!this.avatar) {
    const fullName = `${this.firstName} ${this.lastName}`.trim();
    this.avatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(
      fullName || "User"
    )}&background=6366f1&color=ffffff&size=256&bold=true&uppercase=true`;
  }
});

export default mongoose.model("User", userSchema);