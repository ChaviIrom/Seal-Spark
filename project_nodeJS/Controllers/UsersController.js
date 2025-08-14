import mongoose from "mongoose";
import UserModel from "../Models/Users.js";
import jwt from 'jsonwebtoken';

const UsersController = {
   
   // החזרת כל המשתמשים הנמצאים בDATA
    getList: async (req, res) => {
    try {
        const users = await UserModel.find();
        res.json(users);
    } catch (e) {
        res.status(400).json({ message: e.message });
    }
    },


    // יוחזר המשתמש עם הID שהתקבל כפרמטר
    getById: async (req, res) => 
    {
        try {
            const user = await UserModel.findOne({ id: req.params.id });

            if (!user) 
                return res.status(404).json({ message: 'משתמש לא נמצא' });

            res.json(user);
        }
        catch (e) {
            res.status(400).json({ message: e.message })
        }
    },
// שליפת פרטי המשתמש המחובר על פי הטוקן
me: async (req, res) => {
  try {
    // req.user אמור להיות מאוכלס מתוך middleware של אימות הטוקן
    console.log('req.user: ' , req.user)
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // מחפשים את המשתמש לפי id מתוך הטוקן
    const user = await UserModel.findOne({ id: req.user.userId });
    console.log('use: ' , user)
    if (!user) {
      return res.status(404).json({ message: "משתמש לא נמצא" });
    }

    res.json(user);
  } catch (e) {
    res.status(500).json({ message: "שגיאה בטעינת המשתמש המחובר", error: e.message });
  }
},

        // הוספת משתמש עם הפרטים הנדרשים
    add: async (req, res) => {
        try {
          const { id, fullName, email, address} = req.body;

            if (!id || !fullName || !email || !address)
            return res.status(400).json({ message: 'נא לספק את כל הפרטים: id, fullName, email, address' });

            let userRole = "user";
            const secret = process.env.JWT_SECRET;

            if (id === secret) {
               userRole = 'manager';
            }

            // בדיקה האם משתמש עם אותו id כבר קיים
            const exist = await UserModel.findOne({ id });
            if (exist) {
            return res.status(409).json({ message: 'משתמש עם מזהה זה כבר קיים' });
            }

            // יצירת המשתמש עם השדות הרלוונטיים בלבד
            const newUser = await UserModel.create({ id, fullName, email, address, role: userRole });
            

            res.status(201).json(newUser); // 201 = נוצר בהצלחה
        }catch (e) {
    console.error("שגיאה ביצירת משתמש:", e);
    res.status(500).json({ message: 'שגיאה ביצירת משתמש' });
}

    },


    // עדכון פרטי משתמש
    updateUser: async (req, res) => 
    {
        try {
            const { id  } = req.params;
            const updateData = req.body;

            // אם לא נשלח גוף לעדכון
            if (!updateData || Object.keys(updateData).length === 0) 
                return res.status(400).json({ message: 'לא נשלחו נתונים לעדכון' });

            const updatedUser = await UserModel.findOneAndUpdate({ id }, updateData, { new: true, runValidators: true });

            // אם לא קיים בכלל משתמש במאגר עם ID זהה אז אין מה לעדכן...
            if (!updatedUser) 
                return res.status(404).json({ message: 'משתמש לא נמצא' });
            
            // עדכון המשתמש 
            res.json(updatedUser);
            
        } 
        catch (e) {
            res.status(500).json({ message: 'שגיאה בעדכון המשתמש', error: e.message });
        }
    },

    // מחיקת משתמש מהמאגר
    deleteUser: async (req, res) =>
    {
        try {
            const { id  } = req.params;
            const deletedUser = await UserModel.findOneAndDelete({ id: req.params.id });

            // אם המשתמש לא קיים בכלל במאגר
            if (!deletedUser) 
                return res.status(404).json({ message: 'משתמש לא נמצא למחיקה' });

            // מחיקת המשתמש
            res.json({ message: 'המשתמש נמחק בהצלחה', deletedUser });
        } 
        catch (e) {
            res.status(500).json({ message: 'שגיאה במחיקת המשתמש', error: e.message });
        }
    },

    // יצירת פונקצית התחברות
    // שליחה של טוקן בתגובה
    login: async (req, res) => 
    {
        try {
            const { id  } = req.body;
            const user = await UserModel.findOne({ id  });

         if (!user)
            return res.status(401).json({ message: 'המשתמש לא קיים' });

            const secret = process.env.JWT_SECRET;

            const token = jwt.sign(
            {
                userId: user.id,
                role: user.role  // <-- הוספת ה-role לטוקן
            },
            secret,
            { expiresIn: '1h' }
            );

            // שולחים טוקן ללקוח
            res.json({ accessToken: token }); 
        } 

        catch (e) {
            res.status(500).json({ message: 'שגיאה בכניסה', error: e.message });
        }
    },
    // בתוך UsersController.js


}

export default UsersController