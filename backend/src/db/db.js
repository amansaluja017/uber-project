import mongoose from "mongoose";

const connectToDB = async () => {
  try {
    const connect = await mongoose.connect(
      `${process.env.DB_CONNECT}/${process.env.DB_NAME}`
    );
    console.log(`Connected to ${process.env.DB_NAME} database`);
  } catch (error) {
    console.error("could not connect to database", error);
  }
};

export default connectToDB;
