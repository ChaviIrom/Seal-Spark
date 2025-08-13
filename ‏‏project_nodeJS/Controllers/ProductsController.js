import mongoose from 'mongoose'
import ProductModel from '../Models/Products.js'
import CategoryModel from "../Models/Categories.js";

const ProductsController = {
    getList: async (req , res) =>
    {
        let products = [];
        try{
           products = await ProductModel.find();
           res.json(products);  
        }
        catch (e){
             res.status(400).json({ message: e.message })
        }
    },
    getByIdProduct: async (req , res)=>
    {
        try{
            const product = await ProductModel.findOne({ id: Number(req.params.id) });
            if(!product)
                return res.status(404).json({ message: 'המוצר לא קיים' });

            res.json(product);
        }
        catch (e){
             res.status(400).json({ message: e.message })
        }     
    },
 getByCategory: async (req, res) => {
    try {
        
        console.log("getByCategory called, categoryId:", req.params.categoryId);

        const products = await ProductModel.find({ categoryId: Number(req.params.categoryId) });
        console.log("Products found:", products.length);

        if (products.length === 0) {
            console.log("No products found for this category");
            return res.status(404).json({ message: 'לא נמצאו מוצרים בקטגוריה זו' });
        }

        res.json(products);
    } catch (e) {
        console.log("Error in getByCategory:", e.message);
        res.status(400).json({ message: e.message });
    }
},
    add: async (req , res)=>
    {
        try{
            const {id , name , description , price , categoryId , image} = req.body;

            if(!id || !name || !description || !price || !categoryId || !image)
               return res.status(400).json({ message: 'נא לספק את כל הפרטים: id, name, description, price, categoryId, image' });
            
            const product = await ProductModel.findOne({id});
            if(product)
              return res.status(409).json({ message: 'מוצר עם מזהה זה כבר קיים' });

            const category = await CategoryModel.findOne({id: Number(categoryId)});
            console.log("Category found:", category);
            
            if(!category)
                return res.status(409).json({ message:'קטגוריה זו אינה קיימת' });

            const newProduct = await ProductModel.create({id , name , description , price , categoryId , image});
            res.status(201).json(newProduct);
        }
        catch (e){
            res.status(500).json({ message: 'שגיאה ביצירת המוצר' });
        }
    }
}

export default ProductsController;