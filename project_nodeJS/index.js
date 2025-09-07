import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import UsersRouter from "./Routers/UsersRouter.js";
import OrdersRouter from "./Routers/OrdersRouter.js";
import ProductsRouter from './Routers/ProductsRouter.js'
import ShopCartRouter from './Routers/ShopCartRouter.js'
import CategoriesRouter from './Routers/CategoriesRouter.js'
import ContactUsRouter from './Routers/ContactUsRouter.js'
import connectDB from "./database.js";

const app = express()
const port = process.env.PORT || 3000;
connectDB();

const allowedOriginsProd = [
  'https://sealspark.onrender.com'
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);               // Postman / curl
    if (origin.match(/^http:\/\/localhost:\d+$/)) return callback(null, true); // כל localhost בפיתוח
    if (allowedOriginsProd.includes(origin)) return callback(null, true);      // production React
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true
}));

// טיפול ב-preflight OPTIONS
app.options('*', cors());


app.use(bodyParser.json());
// Middleware שמדפיס פרמטרים לכל קריאה
const logParamsMiddleware = (req, res, next) => {
  console.log(`Route accessed: ${req.originalUrl}`);
  console.log('Params:', req.params);
  console.log('Query:', req.query);
  next();
};

// להוסיף לכל Router
app.use('/users', logParamsMiddleware, UsersRouter);
app.use('/orders', logParamsMiddleware, OrdersRouter);
app.use('/shopCart', logParamsMiddleware, ShopCartRouter);
app.use('/products', logParamsMiddleware, ProductsRouter);
app.use('/categories', logParamsMiddleware, CategoriesRouter);
app.use('/contactUs', logParamsMiddleware, ContactUsRouter);



app.listen(port, () =>
  console.log(`Example app listening on http://localhost:${port}`)
)