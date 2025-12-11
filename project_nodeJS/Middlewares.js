import jwt from 'jsonwebtoken';

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

        // אריזה אחידה תחת req.user
        req.user = {
            userId: decoded.userId,
            role: decoded.role,
        };

        console.log("jwtMiddleware: req.user:", req.user);
        next();
    } catch (err) {
        console.log("JWT ERROR (general):", err);
        res.status(401).send({ message: "Unauthorized" });
    }
};

// מידלוור לבדיקה אם המשתמש הוא מנהל (role)
export const managerJwtMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        console.log("managerJwtMiddleware: No or invalid authHeader");
        return res.status(401).send({ message: "Unauthorized - missing or invalid token" });
    }

    const token = authHeader.slice(7);

    try {
        const secret = process.env.JWT_SECRET;
        const decoded = jwt.verify(token, secret);

        // אריזה אחידה תחת req.user
        req.user = {
            userId: decoded.userId,
            role: decoded.role,
        };

        console.log("managerJwtMiddleware: req.user:", req.user);

        if (req.user.role === 'manager') {
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
};