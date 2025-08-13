import express from "express";
import ContactUsController from "../Controllers/ContactUsController.js";
import { managerJwtMiddleware , jwtMiddleware } from "../Middlewares.js";

const ContactUsRouter = express.Router();

ContactUsRouter.get('/getList' , managerJwtMiddleware,ContactUsController.getList);
ContactUsRouter.post('/add', jwtMiddleware,ContactUsController.add);

export default ContactUsRouter;