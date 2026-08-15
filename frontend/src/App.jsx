import { LoginPage } from "./Pages/LoginPage";
import { DashBoardPage } from "./Pages/DashBoardPage";
import { RegisterPage } from "./Pages/RegisterPage";
import { AttendancePage } from "./Pages/AttendancePage";
import { GradesPage } from "./Pages/GradesPage";
import { HomePage } from "./Pages/HomePage";
import { AddSemPage } from "./Pages/AddSemPage";
import { PlanYourBunksPage } from "./Pages/PlanYourBunks";
import { SemesterLayout } from "./Components/home/SemesterLayout";
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

        <Route path="semesters" element={<HomePage />} />
        {/* <Route path="/dashboard/:semId" element={<SemesterLayout />}> */}

          <Route path="/dashboard/:semId" element={<DashBoardPage />} />
          <Route path="/dashboard/:semId/attendance" element={<AttendancePage />} />
          <Route path="/dashboard/:semId/attendance" element={<GradesPage />} />
          <Route path="add-semester" element={<AddSemPage />} />
          <Route path="/dashboard/:semId/planner" element={<PlanYourBunksPage />} />

        {/* </Route> */}

      </Route>

    </Routes>
    </>
  )
}

export default App
