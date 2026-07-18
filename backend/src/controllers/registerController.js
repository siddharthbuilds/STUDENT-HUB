import User from "../models/userModel.js"
async function registerController (req,res)
{
    try{
        await User.createUser(req.body);
    }

    catch(err){
        return res.status(500).json({message: err})
    }
    
    return res.status(201).json({message:'Registration Successful!'})
}

export default registerController