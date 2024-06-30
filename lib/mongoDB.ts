import mongoose from "mongoose";

let isConnected: boolean = false;

export const connectToDB = async (): Promise<void> => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log("MongoDb is already connected");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI || "", {
      dbName: "lexikitchen_db"
    });

    isConnected = true;
    console.log("MongoDB is connected");
  } catch (error) {
    console.error(error);
  }
}