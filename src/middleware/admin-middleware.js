import jwt from "jsonwebtoken";
import { prismaClient } from "../app/database.js";

export const adminMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({
            errors: '401 Unauthorized',
        });
    }

    jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
        if (err) {
            return res.status(403).json({
                errors: "Invalid Token",
            });
        }

        const admin = await prismaClient.user.findUnique({
            where: {
                id: user.id,
            },
        });

        if (!admin || admin.role !== 'admin') {
            return res.status(403).json({
                errors: '403 Forbidden',
            });
        }

        req.user = user;
        next();
    });
};
