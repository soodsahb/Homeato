const stripe = require("stripe")(process.env.STRIPE_SK);
import { Order } from "../models/Order";
import { buffer } from "micro";
export async function POST(req) {
  const sig = req.headers.get("stripe-signature");
  let event;

  try {
    const reqBuffer = await req.text();
    const signsecret = process.env.STRIPE_SIGN_SECRET;
    event = stripe.webhooks.constructEvent(reqBuffer, sig, signsecret);
  } catch (e) {
    console.error("stripe error");
    return Response.json(e, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const orderId = event?.data?.object?.metadata?.orderId;
    console.log(orderId);
    const isPaid = event?.data?.object?.payment_status === "paid";
    console.log(isPaid);

    if (isPaid) {
      await Order.updateOne({ _id: orderId }, { paid: true });
      console.log(orderId);
    }

    // console.log(event);
  }

  return Response.json("ok", { status: 200 });
}
