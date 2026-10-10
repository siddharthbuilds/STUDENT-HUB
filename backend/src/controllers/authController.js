import User from "../models/userModel.js"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import { randomUUID, randomBytes } from "node:crypto";
import { readFile } from "node:fs/promises";
import mydb from "../config/database.js";
import { createSemesterData } from "./semesterController.js";
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

export async function demoSessionController(req,res)
{
    const userId = `demo-${randomUUID()}`.toLowerCase();
    const email = `${randomUUID()}@demo.studenthub.invalid`.toLowerCase();
    const password = randomBytes(32).toString("hex");
    const userName = "Demo Student";
    const connection = await mydb.getConnection();
    try {
        const data = JSON.parse(await readFile(new URL("../data/semester.json", import.meta.url), "utf8"));
        await connection.beginTransaction();
        await User.createUser({userId,userName,password,email,connection});
        await createSemesterData({connection,userId,data,
            initialGrades:["S","S","A+","A+","A"],seedDemoAttendance:true});
        await connection.commit();
        const accessToken = jwt.sign({userId,isDemo:true},process.env.JWT_SECRET,{expiresIn:"1d"});
        return res.status(201).json({message:"Demo session ready",accessToken,isDemo:true});
    } catch(err) {
        await connection.rollback();
        return res.status(500).json({message:err.message});
    } finally {
        connection.release();
    }
}

