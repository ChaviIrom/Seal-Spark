import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  
  {
    id:String,
    fullName: String,
    email: String,
    address: String,
    role: { type: String, default: 'user' }
  },
  {
    versionKey: false,
    collection: "users" // באותיות קטנות
  }
);

export default mongoose.model("User", userSchema);



