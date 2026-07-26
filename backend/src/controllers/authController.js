import User from "../models/userModel.js"
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
            return res.status(200).json({message: 'Successful login'});
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

