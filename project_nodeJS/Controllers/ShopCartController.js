import mongoose from "mongoose";
import ShopCartModel from '../Models/ShopCart.js'

const ShopCartController = {
    getList: async(req , res) =>
    {
        let orders = [];
        try{
            orders = await ShopCartModel.find();
            res.json(orders);
        }
        catch{
            res.status(400).json({ message: e.message })}
    },
    getById: async (req, res) =>
    {
        console.log('getById called');
        try {
            const { userId } = req.params;
            console.log('userId from params:', userId);

            const carts = await ShopCartModel.find({ userId });

            if (!carts || carts.length === 0)
                return res.status(404).json({ message: "לא נמצאו קניות עבור המשתמש הזה." });

            const allItems = carts.flatMap(cart => Array.isArray(cart.items) ? cart.items : []);

            if (allItems.length === 0)
                return res.status(404).json({ message: "לא נמצאו קניות עבור המשתמש הזה." });

            res.json(allItems);
            } 
            catch (e) {
                res.status(400).json({ message: e.message }); }
    },
    add: async(req , res) =>
    {
        try{
            const { userId, items, shippingAddress, paymentInfo } = req.body;
        
            if(!userId || !items)
                return res.status(400).json({ message: 'נא לספק את כל הפרטים: userId, items' });
        
            let cart = await ShopCartModel.findOne({ userId });
        
            if(!cart)
            {
                const newCart = await ShopCartModel.create({ 
                    userId, 
                    items, 
                    shippingAddress: shippingAddress || {}, 
                    paymentInfo: paymentInfo || {} 
                });
                return res.status(201).json(newCart);
            }
            else
            {
                items.forEach(newItem => 
                {
                    const existingItem = cart.items.find(i => i.productId === newItem.productId);
                    if (existingItem) {
                        existingItem.quantity += newItem.quantity;
                        // עדכון פרטים חדשים במידה והגיעו
                        existingItem.customName = newItem.customName || existingItem.customName;
                        existingItem.customMessage = newItem.customMessage || existingItem.customMessage;
                        existingItem.selectedFont = newItem.selectedFont || existingItem.selectedFont;
                        existingItem.selectedLanguage = newItem.selectedLanguage || existingItem.selectedLanguage;
                    }
                    else {
                        cart.items.push(newItem);
                    }
                });
                // עדכון גם של כתובת המשלוח והתשלום
                if (shippingAddress) cart.shippingAddress = shippingAddress;
                if (paymentInfo) cart.paymentInfo = paymentInfo;

                await cart.save();
                return res.status(200).json(cart); 
            }  
        }
        catch (e){
        res.status(400).json({ message: e.message })}
    },
    removeItem: async (req, res) =>
    {
        const { userId, productId } = req.body;

        if (!userId || productId == null)
            return res.status(400).json({ message: "חובה לציין userId ו־productId" });

        try {
            const cart = await ShopCartModel.findOne({ userId });
            
            if (!cart) 
                return res.status(404).json({ message: "סל קניות זה לא נמצא" });

            cart.items = cart.items.filter(item => item.productId !== productId);
           
            await cart.save();
            res.json(cart);
        } 
        catch(e) {
            res.status(400).json({ message: e.message }); }
    },
    updateShopCart: async(req , res) =>
    {
         try {
            const { id } = req.params;

            if (!mongoose.Types.ObjectId.isValid(id))
                return res.status(400).json({ message: "מזהה לא תקין" });

            const shopCart = await ShopCartModel.findById( id );

            if (!shopCart)
                return res.status(404).json({ message: "סל קניות זה לא נמצא" });

            const updatedShop = await ShopCartModel.findByIdAndUpdate(id, req.body, { new: true });

            res.status(200).json({ success: true, data: updatedShop });
        }
        catch (e) {
            res.status(400).json({ message: e.message })}
    }
}
export default ShopCartController;