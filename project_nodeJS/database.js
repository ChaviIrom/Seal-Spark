import dotenv from 'dotenv'
dotenv.config()

import mongoose from "mongoose";

const uri = process.env.DB_URI
console.log(uri)

// זימון הפונקציה מספרית מונגוס להתחברות
const connectDB = async () => {
  await mongoose.connect(uri);
};
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error)
});

database.once('connected', () => {
  console.log('✅ Database connected!');
  console.log('📂 Connected to database:', mongoose.connection.name); // <--- הדפסת שם המסד בפועל
});
export default connectDB