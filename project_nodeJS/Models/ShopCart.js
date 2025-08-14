import mongoose from "mongoose";

const shopCartSchema = new mongoose.Schema({
  userId: String,
  items: [
    {
      productId: Number,
      quantity: Number,
      customName: String,         // שם לחקיקה
      customMessage: String,      // משפט לחקיקה
      selectedFont: String,       // גופן נבחר
      selectedLanguage: String    // שפה נבחרת
    }
  ]
}, 
{ 
  versionKey: false,
  collection: "shopcart" 
});

export default mongoose.model("ShopCart", shopCartSchema);

