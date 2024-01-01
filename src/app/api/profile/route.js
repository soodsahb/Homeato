import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { User } from "../models/User";
import { UserInfo } from "../models/UserInfo";

export async function PUT(req) {
  mongoose.connect(process.env.MONGO_URL);
  const data = await req.json();
  console.log(data);
  const session = await getServerSession(authOptions);
  const email = session?.user?.email;

  const { _id, userName, image, ...otherUserInfo } = data;

  let filter = {};
  if (_id) {
    filter = { _id };
  } else {
    filter = { email };
  }
  const user = await User.findOne(filter);
  await User.updateOne(filter, { userName, image });
  await UserInfo.findOneAndUpdate({ email: user.email }, otherUserInfo, {
    upsert: true,
  });
  // Update the user in the database

  // Fetch the updated user data from the database

  const user1 = await User.findOne({ email });
  const userInfo1 = await UserInfo.findOne({ email });
  const mergeduser = { ...user1, ...userInfo1 };
  // Update the session with the latest user information
  session.user = {
    ...session.user,
    name: mergeduser.userName,
    image: mergeduser.image,
    phone: mergeduser.phone,
    address: mergeduser.address,
    pincode: mergeduser.pincode,
    country: mergeduser.country,
    city: mergeduser.country,
  };

  return Response.json(true);
}

export async function GET(req) {
  await mongoose.connect(process.env.MONGO_URL);
  const url = new URL(req.url);
  const _id = url.searchParams.get("_id");
  if (_id) {
    const user = await User.findOne({ _id }).lean();
    const userInfo = await UserInfo.findOne({ email: user.email }).lean();
    return Response.json({ ...user, ...userInfo });
  } else {
    const session = await getServerSession(authOptions);
    const email = session?.user?.email;

    if (!email) {
      return Response.json({});
    }
    const user = await User.findOne({ email }).lean();
    const userInfo = await UserInfo.findOne({ email }).lean();
    return Response.json({ ...user, ...userInfo });
  }
}
