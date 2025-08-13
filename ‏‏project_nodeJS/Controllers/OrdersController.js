import mongoose from "mongoose";
import OrdersModel from "../Models/Orders.js";
import UserModel from "../Models/Users.js";
import sendOrderConfirmation from "../Utils/sendOrderConfirmation.js";

const OrdersController = 
{
      getList: async (req, res) => {
        if (req.role !== 'manager') {
            return res.status(403).json({ message: 'Forbidden - requires manager role' });
        }
        try {
            const orders = await OrdersModel.find();
            res.json(orders);
        } catch (e) {
            res.status(400).json({ message: e.message });
        }
        },  
    getById: async (req, res) => {
        try {
            const userId = req.params.userId;

            const existUser = await UserModel.findOne({ id: userId });
            if (!existUser)
                return res.status(404).json({ message: 'המשתמש אינו קיים' });

            const userOrders = await OrdersModel.find({ userId });
            if (!userOrders.length)
                return res.status(404).json({ message: 'לא קיימות הזמנות ללקוח זה' });

            res.json(userOrders);
        } 
        catch (e) {
            res.status(400).json({ message: e.message });}
    },
    getByOrderId: async (req, res) => {
        try {
        const _id = req.params._id; // assuming orderId is passed as a parameter

        const order = await OrdersModel.findById(_id);
        if (!order)
        return res.status(404).json({ message: 'ההזמנה לא נמצאה' });

        res.json(order);
        } 
        catch (e) {
            res.status(400).json({ message: e.message });
        }
    },
add: async (req, res) => {
  try {
    const { userId, items, orderDate, shippingAddress, paymentInfo } = req.body;

    if (!userId || !items) {
      return res.status(400).json({ message: 'נא לספק את כל הפרטים: userId, items' });
    }

    const existUser = await UserModel.findOne({ id: userId });
    if (!existUser) {
      return res.status(409).json({ message: 'המשתמש אינו קיים' });
    }

    // אפשר לוודא שכל פריט ב-items כולל את השדות החדשים (אם רוצים גם לאמת)
    // לדוגמה: items.forEach(item => { ... });

    const newOrder = await OrdersModel.create({
      userId,
      items,
      shippingAddress: shippingAddress || {},
      paymentInfo: paymentInfo || {},
      orderDate: orderDate || Date.now(),
      status: false
    });

    // חישוב סה"כ פריטים
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

    await sendOrderConfirmation(
      existUser.email,
      existUser.fullName,
      { items, totalItems }
    );

    res.status(201).json(newOrder);
  } catch (e) {
    console.error(e.message);
    res.status(500).json({ message: 'שגיאה ביצירת הזמנה' });
  }
},

//     add: async (req, res) => {
     
//         try {
//             const { userId, items, orderDate } = req.body;

//             if (!userId || !items || !orderDate)
//                 return res.status(400).json({ message: 'נא לספק את כל הפרטים: userId, items, orderDate' });

//             const existIdUser = await UserModel.findOne({ id: userId });

//             if (!existIdUser)
//                 return res.status(409).json({ message: 'המשתמש אינו קיים' });

//             const newUser = await OrdersModel.create({
//                 userId,
//                 items,
//                 orderDate,
//                 status: false
//             });

//             res.status(201).json(newUser);
//         }
//         catch (e) {
//             res.status(500).json({ message: 'שגיאה ביצירת הזמנה' }); }
//     }
}
export default OrdersController;