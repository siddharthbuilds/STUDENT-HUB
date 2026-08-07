import { createContext,useState } from "react";

const SemesterContext = createContext();

export function SemesterProvider({ children })
{
    const [semId, setSemId] = useState(null);

    return (
        <SemesterContext.Provider
            value={{
                semId,
                setSemId
            }}
        >
            {children}
        </SemesterContext.Provider>
    );
}
