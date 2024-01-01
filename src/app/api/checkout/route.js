import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { Order } from "../models/Order";
import { Item } from "../models/MenuItem";
const stripe = require("stripe")(process.env.STRIPE_SK);
export async function POST(req) {
  await mongoose.connect(process.env.MONGO_URL);
  const { cartProducts, address, phone, pincode, country, city } =
    await req.json();
  const session = await getServerSession(authOptions);

  const userEmail = session?.user?.email;

  const orderDoc = await Order.create({
    userEmail,
    cartProducts,
    address,
    phone,
    pincode,
    country,
    city,
    paid: false,
  });

  const stripeLineItems = [];

  for (const product of cartProducts) {
    const productName = product.itemName;
    const itemName = product.itemName;
    const productInfo = await Item.findOne({ itemName });
    console.log(productInfo);
    let productPrice = productInfo.basePrice;
    if (product.size) {
      const size = productInfo.sizes.find(
        (size) => size._id.toString() === product.size._id.toString()
      );
      productPrice += size.price;
    }

    if (product.extras?.length > 0) {
      for (const extraThing of product.extras) {
        const extraInfo = productInfo.extraingredients.find(
          (extra) => extra._id.toString() === extraThing._id.toString()
        );
        productPrice += extraInfo.price;
      }
    }

    stripeLineItems.push({
      quantity: 1,
      price_data: {
        currency: "USD",
        product_data: {
          name: productName,
        },
        unit_amount: Math.floor((productPrice * 100) / 85),
      },
    });
  }

  const stripeSession = await stripe.checkout.sessions.create({
    line_items: stripeLineItems,
    mode: "payment",
    customer_email: userEmail,

    success_url:
      process.env.NEXTAUTH_URL +
      "orders/" +
      orderDoc._id.toString() +
      "?clear-cart=1",
    cancel_url: process.env.NEXTAUTH_URL + "cart?canceled=1",
    metadata: { orderId: orderDoc._id.toString() },
    payment_intent_data: {
      metadata: { orderId: orderDoc._id.toString() },
    },
    shipping_options: [
      {
        shipping_rate_data: {
          display_name: "Delivery fee",
          type: "fixed_amount",
          fixed_amount: { amount: 500, currency: "USD" },
        },
      },
    ],
  });

  return Response.json(stripeSession.url);
}
