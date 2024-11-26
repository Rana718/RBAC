import { FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { api } from "../../services/api";
import { loginAdmin } from "../../redux/adminSlice";



export default function Signin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);


    const handleLogin = async (e: FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await api.post('/admin/login', { email, password });
            setIsLoading(false);
            console.log(response.data)
            dispatch(loginAdmin({ email: response.data.email, token: response.data.access_token, tokenType: response.data.token_type }));
            navigate('/dashboard');
        } catch (err) {
            console.log(err);
            setIsLoading(false);
        }
    }


    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <form className="bg-white p-6 rounded shadow-md w-full max-w-sm" onSubmit={handleLogin}>
                {isLoading && (
                    <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-10">
                        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                )}

                <h2 className="text-2xl font-bold mb-4">Admin Login</h2>

                <input
                    type="email" placeholder="Email" value={email}
                    onChange={(e) => setEmail(e.target.value)} required
                    className="w-full border p-2 mb-4 rounded"
                />

                <input
                    type="password" placeholder="Password" value={password}
                    onChange={(e) => setPassword(e.target.value)} required
                    className="w-full border p-2 mb-4 rounded"
                />

                <button disabled={isLoading} className="bg-blue-500 text-white w-full p-2 rounded hover:bg-blue-600" type="submit">
                    Login
                </button>

                <p className="mt-4 text-sm">
                    Don't have an account? {' '}
                    <span onClick={() => navigate('/signup')} className="text-blue-500 cursor-pointer hover:underline">
                        Sign up here
                    </span>
                </p>
            </form>
        </div>
    )
}