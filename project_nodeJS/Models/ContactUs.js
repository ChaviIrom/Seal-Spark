import mongoose from "mongoose";

const contactSchema = mongoose.Schema({
  name: String,
  phone:String,
  createdAt: { type: Date, default: Date.now }
}, {
  versionKey: false,
  collection: "contacts"
});

export default mongoose.model('Contact', contactSchema);