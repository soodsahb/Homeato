import mongoose, { Schema, model, models } from "mongoose";

const ExtraPrice = new Schema({
  name: String,
  price: Number,
});

export const menuSchema = new Schema(
  {
    itemName: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    basePrice: { type: Number, required: true },
    image: { type: String, required: true },
    sizes: { type: [ExtraPrice] },
    extraingredients: { type: [ExtraPrice] },
    category: { type: String, required: true },
  },
  { timestamps: true }
);

export const Item = models?.Item || model("Item", menuSchema);
