const jwt = require('jsonwebtoken');
require("dotenv").config();

const jwtAuthMiddleware = (req, res, next) => {
    const authorization = req.headers.authorization;
    if (!authorization) res.status(401).json({ error: "Token Not Found" });

    const token = req.headers.authorization.split(" ")[1];

    if (!token) return res.status(401).json({ error: "Unauthorized" });

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.userPayload = decodedToken;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({ error: "Invalid Token" });
    }
};


const GenerateToken = (userData) => {
    return jwt.sign(userData, process.env.JWT_SECRET_KEY)
}


module.exports = { jwtAuthMiddleware, GenerateToken } 