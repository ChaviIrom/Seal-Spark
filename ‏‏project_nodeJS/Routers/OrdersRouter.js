import express from "express";
import OrdersController from "../Controllers/OrdersController.js";
import { managerJwtMiddleware , jwtMiddleware } from "../Middlewares.js";

const OrdersRouter = express.Router();

OrdersRouter.get('/getList' , managerJwtMiddleware,OrdersController.getList);
OrdersRouter.get('/getById/:userId' , jwtMiddleware,OrdersController.getById);
OrdersRouter.get('/getByOrderId/:_id', managerJwtMiddleware, OrdersController.getByOrderId);
OrdersRouter.post('/add', jwtMiddleware,OrdersController.add);

export default OrdersRouter;