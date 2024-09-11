import { connectDB } from './db/connect.db.js';
import { app } from './index.js'

const PORT = process.env.PORT || 4000;

app.listen(PORT, async () => {
  try {
    await connectDB()
    console.log("Server is running on PORT : ", PORT);
  } catch (error) {
    console.log("MongoDB connection failed..");
  }
})