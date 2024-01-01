import { isAdmin } from "../auth/[...nextauth]/route";
import { Category } from "../models/Category";
import mongoose from "mongoose";
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
