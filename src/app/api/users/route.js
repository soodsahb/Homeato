import mongoose from "mongoose";
import { User } from "../models/User";
import { isAdmin } from "../auth/[...nextauth]/route";

export async function GET() {
  await mongoose.connect(process.env.MONGO_URL);
  if (await isAdmin()) {
    const users = await User.find();
    return Response.json(users);
  } else {
    return Response.json([]);
  }
}
