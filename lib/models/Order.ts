import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  customerClerkId: String,
  dishes: [
    {
      dish: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Dish",
      },
      size: String,
      quantity: Number,
    },
  ],
  shippingAddress: {
    street: String,
    city: String,
    state: String,
    postalCode: String,
    country: String,
  },
  shippingRate: String,
  totalAmount: Number,
}, { timestamps: true });

const Order = mongoose.models?.Order || mongoose.model("Order", orderSchema);

export default Order;