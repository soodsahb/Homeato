import { Category } from "../models/Category";
import mongoose from "mongoose";
import NextAuth, { getServerSession } from "next-auth";
import { UserInfo } from "../models/UserInfo";
import { authOptions } from "../auth/[...nextauth]/route";

export async function isAdmin() {
  const session = await getServerSession(authOptions);
  const userEmail = await session?.user?.email;

  if (!userEmail) {
    return false;
  }

  const userInfo = await UserInfo.findOne({ email: userEmail });
  if (!userInfo) {
    return false;
  }

  return userInfo.admin;
}
export async function POST(req) {
  const { name } = await req.json();

  await mongoose.connect(process.env.MONGO_URL);
  if (await isAdmin()) {
    const createdCategory = await Category.create({ name });
    return Response.json(createdCategory);
  } else {
    return Response.json({});
  }
}

export async function PUT(req) {
  const { _id, name } = await req.json();
  await mongoose.connect(process.env.MONGO_URL);
  if (await isAdmin()) {
    await Category.updateOne({ _id }, { name });
  }

  return Response.json(true);
}

export async function GET() {
  await mongoose.connect(process.env.MONGO_URL);
  return Response.json(await Category.find());
}

export async function DELETE(req) {
  await mongoose.connect(process.env.MONGO_URL);
  const url = new URL(req.url);
  const _id = url.searchParams.get("_id");
  if (await isAdmin()) {
    await Category.deleteOne({ _id });
  }

  return Response.json(true);
}
