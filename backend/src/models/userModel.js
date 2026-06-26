import mydb from "../config/database.js"
import bcyrpt from "bcrypt"
class User{
    static async checkUniqueId(id){
        let exist = false;
        const checkQuery =`SELECT 1 
            FROM INFORMATION_SCHEMA.TABLES 
            WHERE TABLE_SCHEMA = '?' 
            AND TABLE_NAME = '?' `;
        const checkParams = ['studenthub','users'];
        const [checkTable] = await mydb.query(checkQuery,checkParams);
        if(checkTable.length>0)
        {
            const query = 'SELECT EXISTS (SELECT 1 FROM users WHERE user_id=?) AS row_exists;'
            const [rows] = await mydb.query(query,[id])
            exist = rows[0].row_exists===1;
            return exist;
        }
        
        return exist;
    }

    static async createUser(userId,userName,password,email)
    {
        password = await bcyrpt.hash(password,10);
        try{
            const createQuery = `CREATE TABLE IF NOT EXISTS users (
            userId text not null,
            userName text not null,
            password text not null,
            email text not null)`;

            await mydb.query(createQuery);
            const addQuery = `INSERT INTO users 
            VALUES (?, ?, ?, ?)`;
            const params = [userId, userName, password, email];
            await mydb.query(addQuery,params)

        }
        catch(err)
        {
            throw err;
        }
    }
}

export default User