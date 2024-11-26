import { Navigate, Route, Routes } from "react-router-dom";
import Signin from "./components/auth/Signin";
import SignUp from "./components/auth/Signup";
import AdminDashboard from "./components/AdminDashboard";
import LandingPage from "./components/landing";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";


export default function App() {
    const {token} = useSelector((state:RootState) => state.admin);

    return(
        <div>
            <Routes>
                <Route path="/" element={token ? <Navigate to="/dashboard" replace /> : <LandingPage/>}/>
                <Route path="/signin" element={token ? <Navigate to="/dashboard" replace /> :<Signin/>}/>
                <Route path="/signup" element={token ? <Navigate to="/dashboard" replace /> :<SignUp/>}/>
                <Route path="/dashboard" element={token ? <AdminDashboard/>: <Navigate to="/" replace />}/>
            </Routes>
        </div>
    )
}