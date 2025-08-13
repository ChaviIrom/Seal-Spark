import express from "express";
import ProductsController from "../Controllers/ProductsController.js";
import { managerJwtMiddleware , jwtMiddleware } from "../Middlewares.js";

const ProductsRouter = express.Router();

ProductsRouter.get('/getList' , ProductsController.getList);
ProductsRouter.get('/getById/:id' , ProductsController.getByIdProduct);
ProductsRouter.get('/getByCategoryId/:categoryId' , ProductsController.getByCategory);
ProductsRouter.post('/add' , managerJwtMiddleware,ProductsController.add);

export default ProductsRouter;