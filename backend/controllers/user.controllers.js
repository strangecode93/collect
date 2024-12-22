import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import TryCatch from "../utils/trycatch.js";
import generateToken from "../utils/generateToken.js";

export const registerUser = TryCatch(async(req,res) => {
        const {name, email, password} = req.body;
        let user = await User.findOne({email});
        if(user) {
            return res.status(400).json({
                message: "User already exists"
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        user = await User.create({
            name,
            email,
            password: hashedPassword
        });
        generateToken(user._id, res);
        return res.status(201).json({
            user,
            message: "User created successfully"
        })
    })

export const loginUser = TryCatch(async(req,res) => {
        const {email, password} = req.body;
        let user = await User.findOne({email});
        if(!user) {
            return res.status(400).json({
                message: "User does not exist"
            })
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.status(400).json({
                message: "Invalid credentials"
            })
        }
        generateToken(user._id, res);
        return res.status(200).json({
            user,
            message: "Login successful"
        })
    })

export const myProfile = TryCatch(async(req,res) => {
        const user = await User.findById(req.user._id);
        return res.status(200).json(user)
    })

export const userProfile = TryCatch(async(req,res) => {
        const user = await User.findById(req.params.id).select("-password");
        return res.status(200).json(user)
    })

export const followAndUnfollowUser = TryCatch(async(req,res) => {
    const user = await User.findById(req.params.id);
    const loggedUser = await User.findById(req.user._id);
    if(!user){
        return res.status(404).json({
            message: "User not found"
        })
    }
    if(user._id.toString() === req.user._id.toString()) {
        return res.status(400).json({
            message: "You cannot follow yourself"
        })
    }
    if(user.followers.includes(loggedUser._id)) {
        const indexFollowing = loggedUser.following.indexOf(user._id);
        const indexFollowers = user.followers.indexOf(loggedUser._id);
        loggedUser.following.splice(indexFollowing, 1);
        user.followers.splice(indexFollowers, 1);
    await user.save();
    await loggedUser.save();
    return res.status(200).json({
        message: "User Unfollowed"
    })
    } else {
        loggedUser.following.push(user._id);
        user.followers.push(loggedUser._id);
        await loggedUser.save();
        await user.save();
        return res.status(200).json({
            message: "User Followed"
        })
    }
})

export const logOutUser = TryCatch(async(req,res) => {
    res.cookie("token", "", {
        maxAge: 0
    });
    return res.status(200).json({
        message: "Logout successful"
    })
})