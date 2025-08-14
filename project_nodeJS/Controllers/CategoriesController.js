import mongoose from "mongoose";
import CategoryModel from "../Models/Categories.js";
import ProductModel from '../Models/Products.js'

const CategoriesController = {
  getList: async (req, res) => 
    {
        let Categories = []
        try {
                Categories = await CategoryModel.find();
                res.json({ Categories });
        } catch (e) {
            res.status(400).json({ message: e.message })
        }
    },
    getById: async (req , res)=>
    {
        try{
            const category = await CategoryModel.findOne( {id : req.params.id} );
           
            if(!category)
                return res.status(404).json({ message: 'הקטגוריה לא קיימת' });
            
            let products = [];
            products = await ProductModel.find({categoryId : req.params.id});

            if(!products || products.length === 0)
                return res.status(404).json({ message: 'לא קיימים מוצרים בקטגוריה זו' });

            res.json(products);
        }
        catch (e){
            res.status(400).json({ message: e.message })
        }
    },
    add: async (req, res) => 
    {
        try{
            const { id , name , title} = req.body;

            if(!id || !name || !title)
                return res.status(400).json({ message: 'נא לספק את כל הפרטים: id,name' });   
            const exist = await CategoryModel.findOne({ id: Number(id) });

            if (exist) 
                return res.status(409).json({ message: 'קטגוריה עם מזהה זה כבר קיימת' });

            const newCategory = await CategoryModel.create({ id: Number(id), name, title });

            res.status(201).json(newCategory); // 201 = נוצר בהצלחה
        }
        catch (e) {
            res.status(400).json({ message: e.message })
        }
    },
}
export default CategoriesController;