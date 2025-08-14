import crypto from 'crypto';
import jwt from 'jsonwebtoken'

// מידלוור לבדיקה כללית של טוקן JWT
export const jwtMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).send({ message: "Unauthorized - missing or invalid token" });
    }

    const token = authHeader.slice(7);

    try {
        const secret = process.env.JWT_SECRET;
        const decoded = jwt.verify(token, secret);

        // אריזה תחת req.user
        req.user = {
          userId: decoded.userId,
          role: decoded.role,
        };
        console.log("managerJwtMiddleware: decoded userId:", req.userId);
        console.log("managerJwtMiddleware: decoded role:", req.role);
        
        next();
    } catch (err) {
        res.status(401).send({ message: "Unauthorized" });
    }
};

// מידלוור לבדיקה אם המשתמש הוא מנהל (role)
export const managerJwtMiddleware = (req, res, next) => {

    console.log("managerJwtMiddleware called");

    const authHeader = req.headers.authorization;
    console.log("authHeader:", authHeader);

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        console.log("No or invalid authHeader (manager)");
        return res.status(401).send({ message: "Unauthorized - missing or invalid token" });
    }

    const token = authHeader.slice(7);
    console.log("token (manager):", token);

    try {
        const secret = process.env.JWT_SECRET;
        const decoded = jwt.verify(token, secret);
        req.userId = decoded.userId;
        req.role = decoded.role; // הוצאת role מהטוקן

        console.log("managerJwtMiddleware: decoded userId:", req.userId);
        console.log("managerJwtMiddleware: decoded role:", req.role);

        if (req.role === 'manager') {
            console.log("managerJwtMiddleware: user is מנהל, calling next()");
            next();
        } else {
            console.log("managerJwtMiddleware: user is NOT מנהל, sending 403");
            res.status(403).send({ message: "Forbidden" });
        }
    } catch (err) {
        console.log("JWT ERROR (manager):", err);
        res.status(401).send({ message: "Unauthorized" });
    }
}
