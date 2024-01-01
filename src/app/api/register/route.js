//ethe menu post request milni aa jehri mai register/page.js ch de reha aa
//nale ethe apa mongoose use krde hoye jehra env vi ch variable rkhya aa othe through database na connect ho rhe aa nale user create kr rhe aa

import mongoose from "mongoose";
import { User } from "./../models/User";

export async function POST(req) {
  const body = await req.json();
  console.log(body);
  mongoose.connect(process.env.MONGO_URL);
  const createdUser = await User.create(body);
  return Response.json(createdUser);
}
