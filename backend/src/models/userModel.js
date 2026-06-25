import mydb from "../config/database.js"
class User{
    static async checkUniqueId(id){
        const query = 'SELECT EXISTS (SELECT 1 FROM users WHERE user_id=?) AS row_exists;'
        const [rows] = await mydb.query(query,[id])
        const exist = rows[0].row_exists===1;
        return exist;
    }

    static async createUser(id,name,password,email)
    {
        return //will change later..
    }
}

export default User