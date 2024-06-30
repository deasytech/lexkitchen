import mongoose, { model, models } from "mongoose";

const DishSchema = new mongoose.Schema({
  title: String,
  description: String,
  media: [String],
  category: String,
  menus: [{ type: mongoose.Schema.Types.ObjectId, ref: "Menu" }],
  tags: [String],
  sizes: [String],
  price: Number,
}, { timestamps: true });

const Dish = models?.Dish || model("Dish", DishSchema);

export default Dish;