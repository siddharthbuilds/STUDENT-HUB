import User from "../models/userModel.js"
async function uniqueUserMiddleware(req,res,next)
{
    const exist = await User.checkUniqueId(req.body.userId);
    if(exist)
    {
        return res.status(400).json({message:'UserID Already Exists!!'})
    }
    next();
}

export default uniqueUserMiddleware