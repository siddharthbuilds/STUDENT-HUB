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

    static async addSemester({})
    {

    }

    static async removeSemester(semId)
    {
     const removeSemQuery = `DELETE from semesters WHERE sem_id=?`;
     const params = [semId];
     try{
        await mydb.query(removeSemQuery,params);
     }
     catch(err)
     {
        throw err;
     }

    }
}

export default Semester