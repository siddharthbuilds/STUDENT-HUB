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
import { MainLayout } from "./Components/Layout";
function App() {
  

  return (
    <>
    <Routes>

    <Route path="/user" element={<MainLayout />}>

        <Route path="semesters" element={<HomePage/>} />
        <Route path="grades" element={<GradesPage/>} />

    </Route>

      </Routes>
    </>
  )
}

export default App
