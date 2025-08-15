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
const port = process.env.PORT || 3000;
connectDB();

const allowedOrigins = [
  'http://localhost:5176',
  'http://localhost:5177',
  'https://sealspark.onrender.com'
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));


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