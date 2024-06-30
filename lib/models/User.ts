import mongoose, { model, models } from "mongoose";

const UserSchema = new mongoose.Schema({
  clerkId: String,
  wishList: { type: Array, default: [] },
}, { timestamps: true });

const User = models?.User || model("User", UserSchema);

export default User;