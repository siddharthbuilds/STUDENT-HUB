import { LoginPage } from "./Pages/LoginPage";
import { DashBoardPage } from "./Pages/DashBoardPage";
import { RegisterPage } from "./Pages/RegisterPage";
import { AttendancePage } from "./Pages/AttendancePage";
import { GradesPage } from "./Pages/GradesPage";
import { HomePage } from "./Pages/HomePage";
import { AddSemPage } from "./Pages/AddSemPage";
import { PlanYourBunksPage } from "./Pages/PlanYourBunks";
import {Routes, Route} from "react-router";
import { ProtectedRoute } from "./Components/routes/ProtectedRoutes";
function App() {
  

  return (
    <>
    <Routes>
      
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />

      <Route path="/register" element={<RegisterPage />} />

      <Route element={<ProtectedRoute />}>

        <Route path="/dashboard" element={<DashBoardPage />} />
        <Route path="/attendance" element={<AttendancePage />} />
        <Route path="/semesters" element={<HomePage />} />
        <Route path="/grades" element={<GradesPage />} />
        <Route path="/add-semester" element={<AddSemPage />} />
        <Route path="/planner" element={<PlanYourBunksPage />} />

      </Route>

    </Routes>
    </>
  )
}

export default App
