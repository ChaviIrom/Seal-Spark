import React from 'react';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from './routs/root.jsx'
import Branches from './components/footer/Branches.jsx'
import Home from './pages/HomePage/AppHomePage.jsx'
import About from './pages/About/About.jsx';
import ContactUs from './components/footer/ContactUs/ContactUs.jsx'
import Orders from './pages/Orders/OrderConfirmation.jsx';
import OrdersDetails from './pages/Orders/OrderDetails.jsx'
import SearchProduct from './components/header/SearchProdect.jsx';
import ShopCart from './components/header/ShopCart.jsx'
import CategoryId from './pages/Categories/CategoryDisplay.jsx'
import Category from './Grid/nav.jsx';
import Register from './pages/Register.jsx';
import Login from './pages/Login.jsx';
import ProductDetails from './pages/Categories/ProductDetails.jsx'
import Admin from './pages/management/Admin.jsx'
import AddCategories from './pages/management/AddCategory.jsx'
import AddProduct from './pages/management/AddProduct.jsx'
import SeeUsers from './pages/management/SeeUsers.jsx'
import SeeOrders from './pages/management/SeeOrders.jsx'
import SeeContuctUs from './pages/management/SeeContactUs.jsx'
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