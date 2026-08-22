import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
export async function registerMiddleware(req,res,next)
{
    if(!req.body.userId||!req.body.userName||!req.body.password||!req.body.email)
    {
        return res.status(400).json({message: 'All fields are mandatory'})
    }
    if(await User.existsId(req.body.userId)) 
    {
        return res.status(400).json({message:'UserID Already Exists!!'})
    }
    if (await User.existsEmail(req.body.email))
    {
        return res.status(400).json({message:'Email Already Exists!!'})

    }
    next();
}

export async function loginMiddleware(req,res,next)
{
    const body = req.body;
    if(!body.userId || !body.password)
    {
        return res.status(400).json({message: 'All fields are mandatory'});
    }
    const exists = await User.existsId(body.userId);
    if(!exists) 
    {
        return res.status(400).json({message: 'User ID not exists'});
    }
    next();
}

export async function authenticateToken(req,res,next)
{
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    try 
    {
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.user = decoded; //{userId, iat, exp}

    next();
    } 
    catch (err) 
    {
        return res.status(401).json({
            message: "Invalid or expired token"
        });
    }
}