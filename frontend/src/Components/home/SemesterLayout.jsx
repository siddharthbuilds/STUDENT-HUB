import { useParams } from "react-router";
import { useSemester } from "../../context/useSemester";
import { useEffect } from "react";
import { getSemesters } from "../../../api/semesterApi";
import { Outlet } from "react-router";

export function SemesterLayout()
{
    const {semId} = useParams();
    const {semesterDetails,setSemesterDetails} = useSemester();

   useEffect(() => {
        if (semesterDetails?.semId === semId) {
            return;
        }
        async function loadSemester() {
            const response = await getSemesters(semId);
            const semesterData = response.data.semesters;
            const semester = semesterData.find(
                sem => sem.semId === semId
            );
            setSemesterDetails(semester);
        }
        loadSemester();

    }, [semId, semesterDetails, setSemesterDetails]);

    return <Outlet />;
}