import User from "../models/userModel.js"
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
