import express from "express";
import UsersController from "../Controllers/UsersController.js";
import { managerJwtMiddleware , jwtMiddleware } from "../Middlewares.js";

const UsersRouter = express.Router();

UsersRouter.get("/getList", managerJwtMiddleware, UsersController.getList);
UsersRouter.get("/getById/:id", jwtMiddleware,UsersController.getById);
UsersRouter.get('/me', jwtMiddleware, UsersController.me);
UsersRouter.delete("/delete/:id", jwtMiddleware,UsersController.deleteUser);
UsersRouter.put("/update/:id", jwtMiddleware,UsersController.updateUser);
UsersRouter.post("/add", UsersController.add);
UsersRouter.post("/login", UsersController.login);

export default UsersRouter;