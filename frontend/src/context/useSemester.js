import { useContext } from "react";
import { SemesterContext } from "./SemesterContext";

export function useSemester() {
    return useContext(SemesterContext);
}