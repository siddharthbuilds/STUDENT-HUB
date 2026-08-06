import { LoginPage } from "./Pages/LoginPage"
import { DashBoardPage } from "./Pages/DashBoardPage"
import { RegisterPage } from "./Pages/RegisterPage"
import { AttendancePage } from "./Pages/AttendancePage"
import { GradesPage } from "./Pages/GradesPage"
import { HomePage } from "./Pages/HomePage"
import { AddSemPage } from "./Pages/AddSemPage"
import { PlanYourBunksPage } from "./Pages/PlanYourBunks"
import {Routes, Route} from "react-router"
function App() {
  

  return (
    <>
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/dashboard" element={<DashBoardPage />} />
      <Route path="/attendance" element={<AttendancePage />} />
      <Route path="/semesters" element={<HomePage />} />
      <Route path="/grades" element={<GradesPage />} />
      <Route path="/add-semester" element={<AddSemPage />} />
      <Route path="/planner" element={<PlanYourBunksPage />} />
    </Routes>
    </>
  )
}

export default App
