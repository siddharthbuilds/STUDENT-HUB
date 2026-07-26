import User from "../models/userModel.js"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config();
export async function registerController (req,res)
{
    try{
        await User.createUser(req.body);
    }

    catch(err){
        return res.status(500).json({message: err.message})
    }
    
    return res.status(201).json({message:'Registration Successful!'})
}

export async function loginController(req,res)
{
    try{
        const verification = await User.verifyPassword(req.body);
        if(verification) 
        {
            const payload = {userId: req.body.userId};
            const secret = process.env.JWT_SECRET;
            const token = jwt.sign(payload,secret, {expiresIn: "1d"});
            return res.status(200).json({message: 'Successful login',
                accessToken: token
            });
        }
        else{
            return res.status(401).json({message: 'Invalid Password'});
        }
    }
    catch(err)
    {
        return res.status(500).json({message:err.message});
    }
}

