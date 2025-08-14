import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
  userId: String,
  items: [{
    productId: Number,
    quantity: Number,
    customName: String,
    customMessage: String,
    selectedFont: String,
    selectedLanguage: String
  }],
  shippingAddress: {
    fullName: String,
    address: String,
    city: String,
    postalCode: String,
    phone: String
  },
  paymentInfo: {
    method: String,
    cardLast4: String
  },
  orderDate: {
    type: Date,
    default: Date.now
  },
  status: String
}, {
  versionKey: false,
  collection: "orders"
});

export default mongoose.model("Order", orderSchema);

