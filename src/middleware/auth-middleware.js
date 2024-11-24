import jwt from 'jsonwebtoken';

export const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        res.status(401).json({
            errors: '401 Unauthorized',
        }).end();
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            res.status(403).json({
                errors: "Invalid Token",
            }).end();
        }

        req.user = user;
        next();
    });
}