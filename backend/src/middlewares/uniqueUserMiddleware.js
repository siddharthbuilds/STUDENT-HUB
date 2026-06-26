import User from "../models/userModel.js"
async function uniqueUserMiddleware(req,res,next)
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

export default uniqueUserMiddleware