import mongoose from "mongoose";

const categorySchema = mongoose.Schema(
    {
        id : Number,
        name: String,
        title: String,
    } ,
    {
    versionKey : false,
    collection: "categories"
    }
);

export default mongoose.model("Categories" , categorySchema);