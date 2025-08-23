import mongoose from "mongoose";
import ShopCartModel from '../Models/ShopCart.js'

const ShopCartController = {
    // שליפה של כל הסל של המשתמש המחובר
    getList: async (req, res) => {
        try {
            const userId = req.user.userId; // מזהה מתוך הטוקן
            const cart = await ShopCartModel.findOne({ userId });

            if (!cart || !cart.items || cart.items.length === 0)
                return res.status(404).json({ message: "לא נמצאו פריטים בסל עבור המשתמש הזה." });

            res.json(cart.items);
        }
        catch (e) {
            res.status(400).json({ message: e.message });
        }
    },

    // הוספה/עדכון פריטים לסל
    add: async (req, res) => {
        try {
            const userId = req.user.userId; // מזהה מתוך הטוקן
            const { items, shippingAddress, paymentInfo } = req.body;

            if (!items)
                return res.status(400).json({ message: 'נא לספק פרטי items' });

            let cart = await ShopCartModel.findOne({ userId });

            if (!cart) {
                const newCart = await ShopCartModel.create({
                    userId,
                    items,
                    shippingAddress: shippingAddress || {},
                    paymentInfo: paymentInfo || {}
                });
                return res.status(201).json(newCart);
            } else {
                items.forEach(newItem => {
                    const existingItem = cart.items.find(i => i.productId === newItem.productId);
                    if (existingItem) {
                        existingItem.quantity += newItem.quantity;
                        existingItem.customName = newItem.customName || existingItem.customName;
                        existingItem.customMessage = newItem.customMessage || existingItem.customMessage;
                        existingItem.selectedFont = newItem.selectedFont || existingItem.selectedFont;
                        existingItem.selectedLanguage = newItem.selectedLanguage || existingItem.selectedLanguage;
                    } else {
                        cart.items.push(newItem);
                    }
                });
                if (shippingAddress) cart.shippingAddress = shippingAddress;
                if (paymentInfo) cart.paymentInfo = paymentInfo;

                await cart.save();
                return res.status(200).json(cart);
            }
        }
        catch (e) {
            res.status(400).json({ message: e.message });
        }
    },

    // מחיקת פריט מסל המשתמש
    removeItem: async (req, res) => {
        const userId = req.user.userId; // מזהה מתוך הטוקן
        const { productId } = req.body;

        if (productId == null)
            return res.status(400).json({ message: "חובה לציין productId" });

        try {
            const cart = await ShopCartModel.findOne({ userId });
            if (!cart)
                return res.status(404).json({ message: "סל קניות זה לא נמצא" });

            cart.items = cart.items.filter(item => item.productId !== productId);

            await cart.save();
            res.json(cart);
        }
        catch (e) {
            res.status(400).json({ message: e.message });
        }
    },

    // עדכון סל (כתובת משלוח, תשלום וכו')
    updateShopCart: async (req, res) => {
        try {
            const { id } = req.params;

            if (!mongoose.Types.ObjectId.isValid(id))
                return res.status(400).json({ message: "מזהה לא תקין" });

            const shopCart = await ShopCartModel.findById(id);

            if (!shopCart)
                return res.status(404).json({ message: "סל קניות זה לא נמצא" });

            const updatedShop = await ShopCartModel.findByIdAndUpdate(id, req.body, { new: true });

            res.status(200).json({ success: true, data: updatedShop });
        }
        catch (e) {
            res.status(400).json({ message: e.message });
        }
    }
}

export default ShopCartController;
