import { useContext } from "react";
import { SemesterContext } from "./SemesterContext.jsx";

export function useSemester() {
    return useContext(SemesterContext);
}