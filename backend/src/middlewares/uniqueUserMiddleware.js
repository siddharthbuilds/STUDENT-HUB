import User from "../models/userModel.js"
async function uniqueUserMiddleware(req,res,next)
{
    if(!req.body.userId||!req.body.userName||!req.body.password||!req.body.email)
    {
        return res.status(400).json({message: 'All fields are mandatory'})
    }
    const exist = await User.checkUniqueId(req.body.userId);
    if(exist)
    {
        return res.status(400).json({message:'UserID Already Exists!!'})
    }
    next();
}

export default uniqueUserMiddleware