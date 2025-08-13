import mongoose from 'mongoose';
import ContactModel from '../Models/ContactUs.js';

const ContactController = {
  add: async (req, res) => {
    try {
      const { name, phone } = req.body;

      if (!name || !phone) {
        return res.status(400).json({ message: 'נא למלא את השם והטלפון' });
      }

      const newContact = await ContactModel.create({ name, phone });
      res.status(201).json({ message: 'הפנייה התקבלה בהצלחה', contact: newContact });
    } catch (e) {
      res.status(500).json({ message: 'שגיאה בשליחת הפנייה' });
    }
  },

  getList: async (req, res) => {
    try {
      const contacts = await ContactModel.find().sort({ createdAt: -1 });
      res.json(contacts);
    } catch (e) {
      res.status(500).json({ message: 'שגיאה בקבלת הפניות' });
    }
  }
};

export default ContactController;
