import mydb from "../config/database.js"

async function checkUniqueID (req,res,next)
{
    const query = 'SELECT EXIST (SELECT 1 FROM users WHERE user_id=?) AS row_exists;'
    const idToFind = req.body.userId;
    const [rows] = await mydb.query(query,[idToFind])
    const exist = rows[0].row_exists===1;
    if (exist) next();
    else{
        return res.status(400).json({message: 'This UserID already Exists!'})
    }
}

export default checkUniqueID