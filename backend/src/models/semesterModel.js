import mydb from "../config/database.js";

class Semester{
    static async getSemesters(userId)
        {
            const getSemQuery = `SELECT * from semesters WHERE user_id=?`;
            const params = [userId];
            const queryResult = await mydb.query(getSemQuery,params);
            const semesters = queryResult[0];
            return semesters;
        }
}

export default Semester