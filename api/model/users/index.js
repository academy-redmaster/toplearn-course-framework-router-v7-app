import { password } from "bun";
import * as mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: [true, "the username is required field"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "E-mail is required field"],
    },
    password: {
      type: String,
      required: [true, "Password is required field"],
    },
    profilePhoto: {
      type: String,
      default: "https://redmaster.academy/store/1/redmaster-academy.png",
    },
    bio: { type: String },
    postCount: { type: Number, default: 0 },
    postCount: {
      type: Number,
      default: 0,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: ["Admin", "Guest", "Blogger"],
    },
    isAccountVerified: {
      type: Boolean,
      default: false,
    },
    accountVerificationToken: String,
    accountVerificationTokenExpires: Date,
    active: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  }
);

// Hash the password before saving it to the database

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    this.password = await password.hash(this.password);
  }
  this.password = await Bun.password.hash(this.password, {
    algorithm: "bcrypt",
    cost: 4,
  });
  await next();
});

// match the password

userSchema.methods.isPasswordMatch = async function (enteredPassword) {
  console.log(
    "🚀 ~ await Bun.password.verify:",
    await Bun.password.verify(enteredPassword, this.password)
  );
  return await Bun.password.verify(enteredPassword, this.password);
};

// Generate a unique verification token

export const User = mongoose.model("User", userSchema);
