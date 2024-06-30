import mongoose, { model, models } from "mongoose";

const MenuSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  description: String,
  image: {
    type: String,
    required: true,
  },
  dishes: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Dish" }
  ],
},
  { timestamps: true }
);

const Menu = models?.Menu || model("Menu", MenuSchema);

export default Menu;