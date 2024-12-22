import { Pin } from "../models/pin.model.js";
import TryCatch from "../utils/trycatch.js";
import getDataUrl from "../utils/urlGenerator.js";
import cloudinary from "cloudinary";

export const createPin = TryCatch(async(req, res) => {
    const {title, pin} = req.body

    const file = req.file
    const fileUrl = getDataUrl(file)
    const cloud = await cloudinary.v2.uploader.upload(fileUrl.content)

    await Pin.create({
        title,
        pin,
        image: {
            id: cloud.public_id,
            url: cloud.secure_url
        },
        owner: req.user._id
    })

    res.json({
        message: "Pin created successfully"
    })
})

export const getAllPins = TryCatch(async(req, res) => {
    const pins = await Pin.find().sort({createdAt: -1})
    res.json(pins)
})

export const getSinglePin = TryCatch(async(req, res) => {
    const pin = await Pin.findById(req.params.id).populate("owner", "-password")
    res.json(pin)
})

export const commentOnPin = TryCatch(async(req, res) => {
    const pin = await Pin.findById(req.params.id)
    if(!pin){
        return res.status(404).json({
            message: "Pin not found"
        })
    }
    pin.comments.push({
        user: req.user._id,
        name: req.user.name,
        comment: req.body.comment
    })
    await pin.save()
    res.json({
        message: "Comment Added"
    })
})

export const deleteComment = TryCatch(async(req, res) => {
    const pin = await Pin.findById(req.params.id)
    if(!pin){
        return res.status(404).json({
            message: "Pin not found"
        })
    }
    if(!req.query.commentId) return res.status(404).json({
        message: "Please give comment id"
    })
    const commentIndex = pin.comments.findIndex(comment => comment._id.toString() === req.query.commentId.toString())
    if(commentIndex === -1) return res.status(404).json({
        message: "Comment not found"
    })
    const comment = pin.comments[commentIndex]
    if(comment.user.toString() === req.user._id.toString()){
        pin.comments.splice(commentIndex, 1)
        await pin.save()
        res.json({
            message: "Comment Deleted"
        })
    } else {
        return res.status(404).json({
            message: "You are not authorized to delete this comment"
        })
    }
})

export const deletePin = TryCatch(async(req, res) => {
    const pin = await Pin.findById(req.params.id)
    if(!pin){
        return res.status(404).json({
            message: "Pin not found"
        })
    }
    if(pin.owner.toString() === req.user._id.toString()){
        await cloudinary.v2.uploader.destroy(pin.image.id)
        await pin.deleteOne()
        res.json({
            message: "Pin Deleted"
        })
    } else {
        return res.status(404).json({
            message: "You are not authorized to delete this pin"
        })
    }
})

export const updatePin = TryCatch(async(req, res) => {
    const pin = await Pin.findById(req.params.id)
    if(!pin){
        return res.status(404).json({
            message: "Pin not found"
        })
    }
    if(pin.owner.toString() === req.user._id.toString()){
        pin.title = req.body.title
        pin.pin = req.body.pin
        await pin.save()
        res.json({
            message: "Pin Updated"
        })
    } else {
        return res.status(404).json({
            message: "You are not authorized to update this pin"
        })
    }
})