import { Route, Routes } from "react-router-dom";
import Signin from "./components/auth/Signin";
import SignUp from "./components/auth/Signup";
import AdminDashboard from "./components/AdminDashboard";
import LandingPage from "./components/landing";


export default function App() {
    return(
        <div>
            <Routes>
                <Route path="/" element={<LandingPage/>}/>
                <Route path="/signin" element={<Signin/>}/>
                <Route path="/signup" element={<SignUp/>}/>
                <Route path="/dashboard" element={<AdminDashboard/>}/>
            </Routes>
        </div>
    )
}