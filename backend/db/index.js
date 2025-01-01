import mongoose from "mongoose";

const connectDB = async () => {
  try {
   const connectionInstance = await mongoose.connect(`${process.env.MONGO_URI}`)
   console.log(`\n Mongodb connected !! DB HOST: ${connectionInstance.connection.host}`);
  } catch (error) {
    console.error("Error in DB connection" , error);
    process.exit(1);
  }
}

export default connectDB;