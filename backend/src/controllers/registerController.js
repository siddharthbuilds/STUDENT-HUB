import User from "../models/userModel.js"
import bcrypt from "bcrypt"
async function registerController (req,res)
{
    req.body.password = await bcrypt.hash(req.body.password,10)
    try{
        await User.createUser(req.body);
    }

    catch(err){
        return res.status(500).json({message: err})
    }
    
    return res.status(201).json({message:'Registration Successful!'})
}

export default registerController