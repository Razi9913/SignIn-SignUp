import mongoose from 'mongoose'

async function connectDB() {
  try {
    const conn = await mongoose.connect(process.env.MONGOOSE_URL)
    console.log("MongoDB connected..", conn.connection.host);
  } catch (error) {
    throw new Error("Unable to connect DB", error);
  }
}

export { connectDB }