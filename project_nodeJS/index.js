import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import UsersRouter from "./Routers/UsersRouter.js";
import OrdersRouter from "./Routers/OrdersRouter.js";
import ProductsRouter from './Routers/ProductsRouter.js'
import ShopCartRouter from './Routers/ShopCartRouter.js'
import CategoriesRouter from './Routers/CategoriesRouter.js'
import ContactUs from './Routers/ContactUsRouter.js'
import connectDB from "./database.js";

const app = express()
const port = 3000;
connectDB();

app.use(cors())
app.use(bodyParser.json());

app.use('/users', UsersRouter)
app.use('/orders', OrdersRouter)
app.use('/shopCart', ShopCartRouter)
app.use('/products', ProductsRouter)
app.use('/categories', CategoriesRouter)
app.use('/contactUs', ContactUs)


app.listen(port, () =>
    console.log(`Example app listening on http://localhost:${port}`)
)