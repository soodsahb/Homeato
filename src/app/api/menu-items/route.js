import mongoose from "mongoose";
import { Item } from "../models/MenuItem";
import { isAdmin } from "../category/route";

export async function POST(req) {
  const data = await req.json();

  await mongoose.connect(process.env.MONGO_URL);

  if (await isAdmin()) {
    const createItem = await Item.create(data);

    return Response.json(createItem);
  } else {
    return Response.json({});
  }
}

export async function PUT(req) {
  const { id, ...data } = await req.json();

  await mongoose.connect(process.env.MONGO_URL);

  if (await isAdmin()) {
    await Item.findByIdAndUpdate(id, data);
  }

  return Response.json(true);
}

export async function GET() {
  await mongoose.connect(process.env.MONGO_URL);

  return Response.json(await Item.find());
}
export async function DELETE(req) {
  await mongoose.connect(process.env.MONGO_URL);
  const url = new URL(req.url);
  const _id = url.searchParams.get("_id");
  if (await isAdmin()) {
    await Item.deleteOne({ _id });
  }

  return Response.json(true);
}
