import { LoginPage } from "./Pages/LoginPage";
import { DashBoardPage } from "./Pages/DashBoardPage";
import { RegisterPage } from "./Pages/RegisterPage";
import { HomePage } from "./Pages/HomePage";
import { AttendancePage } from "./Pages/AttendancePage";
import { GradesPage } from "./Pages/GradesPage";
import { SemesterPage } from "./Pages/SemesterPage";
import { AddSemPage } from "./Pages/AddSemPage";
import { PlanYourBunksPage } from "./Pages/PlanYourBunks";
import { SemesterHome } from "./Pages/SemesterHome";
import { SemesterLayout } from "./Components/home/SemesterLayout";
import {Routes, Route, Navigate} from "react-router";
import { ProtectedRoute } from "./Components/routes/ProtectedRoutes";
import { AuthRedirect } from "./Components/routes/AuthRedirect";
import { MainLayout } from "./Components/Layout";
function App() {
  

  return (
    <>
    <Routes>

    <Route path="/" element={<Navigate to="/login" replace />} />

    <Route path="/login" 
          element={
                <AuthRedirect>
                    <LoginPage />
                </AuthRedirect>}>
    </Route>

    <Route path="/register" 
          element={
                <AuthRedirect>
                    <RegisterPage />
                </AuthRedirect>}>
    </Route>


    <Route path="/user" element={<ProtectedRoute />}>
      <Route element={<MainLayout />}>
          <Route index element={<Navigate to="home" replace />} />
          <Route path="home" element={<HomePage />} />
          <Route path="semesters" element={<SemesterPage />} />
          <Route path="grades" element={<GradesPage />} />
          <Route path="add-semester" element={<AddSemPage />} />
          <Route path="semesters/dashboard" element={<SemesterHome />} />
          <Route path="semesters/attendance" element={<AttendancePage />} />
          <Route path="semesters/planner" element={<PlanYourBunksPage />} />
      </Route>
    </Route>

      </Routes>
    </>
  )
}

export default App
