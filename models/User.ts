import { Schema, model, models, Document } from "mongoose";

export type UserRole = "buyer" | "seller" | "admin";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  companyName?: string;
  country?: string;
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      index: true,
    },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["buyer", "seller", "admin"],
      default: "buyer",
    },
    companyName: String,
    country: String,
  },
  { timestamps: true }
);

export const User = models.User || model<IUser>("User", UserSchema);
