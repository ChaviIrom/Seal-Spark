import express from "express";
import ShopCartController from "../Controllers/ShopCartController.js";
import { jwtMiddleware } from "../Middlewares.js";

const ShopCartRouter = express.Router();

ShopCartRouter.get('/getList' , jwtMiddleware,ShopCartController.getList);
ShopCartRouter.get('/getById/:id' , jwtMiddleware,ShopCartController.getById);
ShopCartRouter.post('/add' , jwtMiddleware,ShopCartController.add);
ShopCartRouter.post('/delete' , jwtMiddleware,ShopCartController.removeItem);
ShopCartRouter.put('/update/:id' , jwtMiddleware,ShopCartController.updateShopCart);

export default ShopCartRouter;