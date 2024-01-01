import { Schema, model, models } from "mongoose";

const userInfoSchema = new Schema(
  {
    email: { type: String, required: true },
    address: { type: String },
    pincode: { type: String },
    country: { type: String },
    city: { type: String },
    admin: { type: Boolean, default: false },
    phone: { type: String },
  },
  { timestamps: true }
);

export const UserInfo = models?.UserInfo || model("UserInfo", userInfoSchema);
