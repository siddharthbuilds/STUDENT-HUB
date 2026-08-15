import { LoginPage } from "./Pages/LoginPage";
import { DashBoardPage } from "./Pages/DashBoardPage";
import { RegisterPage } from "./Pages/RegisterPage";
import { HomePage } from "./Pages/HomePage";
import { AttendancePage } from "./Pages/AttendancePage";
import { GradesPage } from "./Pages/GradesPage";
import { SemesterPage } from "./Pages/SemesterPage";
import { AddSemPage } from "./Pages/AddSemPage";
import { PlanYourBunksPage } from "./Pages/PlanYourBunks";
import { SemesterLayout } from "./Components/home/SemesterLayout";
import {Routes, Route, Navigate} from "react-router";
import { ProtectedRoute } from "./Components/routes/ProtectedRoutes";
import { MainLayout } from "./Components/Layout";
function App() {
  

  return (
    <>
    <Routes>
    <Route path="/login" element={<LoginPage />}></Route>
    <Route path="/register" element={<RegisterPage />}></Route>

    <Route path="/user" element={<MainLayout />}>

        <Route index element={<Navigate to="home" replace />} />
        <Route path="home" element={<HomePage />} />
        <Route path="semesters" element={<SemesterPage/>} />
        <Route path="grades" element={<GradesPage/>} />
        <Route path="add-semester" element={<AddSemPage/>} />

    </Route>

      </Routes>
    </>
  )
}

export default App
