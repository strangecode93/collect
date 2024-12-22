import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const isAuth = async(req, res, next) => {
    try {
        const token = req.cookies.token
        const decodedData = jwt.verify(token, process.env.JWT_SECRET);
        if(!decodedData) {
            return res.status(401).json({
                message: "Token Expired"
            })
        }
        req.user = await User.findById(decodedData.id);
        next();
    } catch (error) {
        return res.status(500).json({
            message: "Please Login"
        })
    }
}