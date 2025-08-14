import express from "express";
import CategoriesController from "../Controllers/CategoriesController.js";
import { managerJwtMiddleware , jwtMiddleware } from "../Middlewares.js";

const CategoriesRouter = express.Router();

CategoriesRouter.get('/getList' , CategoriesController.getList);
CategoriesRouter.get('/getById/:id' , CategoriesController.getById);
CategoriesRouter.post('/add' , managerJwtMiddleware,CategoriesController.add);

export default CategoriesRouter;