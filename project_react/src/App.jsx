import React from 'react';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from './routs/root.jsx'
import Branches from '../src/component/Branches.jsx'
import Home from './pages/HomePage/AppHomePage.jsx'
import About from './pages/About/About.jsx';
import ContactUs from './component/Footer/ContactUs/ContactUs.jsx'
import Orders from './pages/Orders/OrderConfirmation.jsx';
import OrdersDetails from '../src/pages/Orders/OrderDetails.jsx'
import SearchProduct from './component/Header/searchProdect.jsx';
import ShopCart from './component/Header/shopCart.jsx'
import CategoryId from './pages/Categories/CategoryDisplay.jsx'
import Category from '../src/Grid/nav.jsx';
import Register from './pages/Register.jsx';
import Login from './pages/Login.jsx';
import ProductDetails from './pages/Categories/ProductDetails.jsx'
import Admin from '../src/Management/admin.jsx'
import AddCategories from '../src/Management/addCategory.jsx'
import AddProduct from '../src/Management/addProduct.jsx'
import SeeUsers from '../src/Management/seeUsers.jsx'
import SeeOrders from '../src/Management/seeOrders.jsx'
import SeeContuctUs from '../src/Management/seeContactUs.jsx'   

export default function App() {
  // const location = useLocation();
  // const background = location.state?.background;
   const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "/about",
          element: <About />,
        },
        {
          path: "/branches",
          element: <Branches />,
        },
        {
          path: "/categories",
          element: <Category />,
        },
        {
          path: "/categories/:categoryId",
          element: <CategoryId />,
        },
        {
          path: "contactus",
          element: <ContactUs/>,
        },
        {
          path:"orders",
          element: <Orders/>
        },
        {
          path: "shopcart",
          element: <ShopCart/>
        },
        {
          path: "register",
          element: <Register/>
        },
        {
          path: "login",
          element: <Login/>
        },
        {
          path: "product/:id",
          element: <ProductDetails/>
        },
        {
          path: "admin",
          element: <Admin/>
        },
        {
          path: "addCategory",
          element: <AddCategories/>
        },  
        {
          path: "addProduct",
          element: <AddProduct/>
        },
        {
          path: "seeUsers",
          element: <SeeUsers/>
        },
        {
          path: "seeOrders",
          element: <SeeOrders/>
        },
        {
          path: "seeContuctUs",
          element: <SeeContuctUs/>
        },
        {
          path: "orderDetails/:orderId",
          element: <OrdersDetails/>
        },
        {
          path: "/searchproduct/:id?",
          element: <SearchProduct/>,
        }
      ],
    }
  ])

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}