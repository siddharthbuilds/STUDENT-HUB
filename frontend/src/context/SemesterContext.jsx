import { createContext,useState } from "react";

export const SemesterContext = createContext();

export function SemesterProvider({ children })
{
    const [semesterDetails, setSemesterDetails] = useState(null);

    return (
        <SemesterContext.Provider
            value={{
                semesterDetails,
                setSemesterDetails
            }}
        >
            {children}
        </SemesterContext.Provider>
    );
}
