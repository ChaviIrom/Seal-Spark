import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    id : Number,
    name: String,
    description: String,
    price: Number,
    categoryId: Number,
    image:String
} ,
{
    versionKey : false,
    collection: "products"
});

export default mongoose.model("Products" , productSchema);