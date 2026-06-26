import mydb from "../config/database.js"

class User{
    static async existsId(id){
        const query = 'SELECT EXISTS (SELECT 1 FROM users WHERE userId=?) AS row_exists;'
        const [rows] = await mydb.query(query,[id])
        const exist = rows[0].row_exists===1;
        return exist;
    }

    static async existsEmail(email){
        const query = 'SELECT EXISTS (SELECT 1 FROM users WHERE email=?) AS row_exists;'
        const [rows] = await mydb.query(query,[email])
        const exist = rows[0].row_exists===1;
        return exist;
    }

    static async createUser({userId,userName,password,email})
    {
        try{
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