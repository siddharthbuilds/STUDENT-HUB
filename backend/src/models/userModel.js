import mydb from "../config/database.js";
import bcrypt from "bcrypt";
class User{
    static async existsId(id){
        const userId = id.replaceAll(" ","").toLowerCase();
        const query = 'SELECT EXISTS (SELECT 1 FROM users WHERE user_id=?) AS row_exists;'
        const [rows] = await mydb.query(query,[userId])
        const exist = rows[0].row_exists===1;
        return exist;
    }

    static async existsEmail(email){
        email = email.replaceAll(" ","").toLowerCase();
        const query = 'SELECT EXISTS (SELECT 1 FROM users WHERE email=?) AS row_exists;'
        const [rows] = await mydb.query(query,[email])
        const exist = rows[0].row_exists===1;
        return exist;
    }

    static async createUser({userId,userName,password,email})
    {
        userId = userId.replaceAll(" ","").toLowerCase();
        const passwordHashed = await bcrypt.hash(password,10);
        email = email.replaceAll(" ","").toLowerCase();
        try{
            const addQuery = `INSERT INTO users (user_id, user_name, password_hash, email) 
            VALUES (?, ?, ?, ?)`;
            const params = [userId, userName, passwordHashed, email];
            await mydb.query(addQuery,params)
        }
        catch(err)
        {
            throw err;
        }
    }

    static async verifyPassword({userId, password})
    {
        const id = userId.replaceAll(" ","").toLowerCase();
        const query = `SELECT password_hash from users where user_id=?`
        const [queryResult] = await mydb.query(query,[id]);
        const userPassword = queryResult[0].password_hash;
        return await bcrypt.compare(password,userPassword); 
    }
}
export default User