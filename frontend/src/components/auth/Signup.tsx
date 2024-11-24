import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../services/api";



export default function SignUp() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();


    const handleSignup = async (e: FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            console.log('Passwords do not match');
            return;
        }
        try {
            await api.post('/admin/signup', { email, password });
            console.log('Account created successfully');
            navigate('/login');
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">

            <form className="bg-white p-6 rounded shadow-md w-full max-w-sm" onSubmit={handleSignup}>
                <h2 className="text-2xl font-bold mb-4">Admin Signup</h2>

                <input
                    type="email" placeholder="Email" value={email}
                    onChange={(e) => setEmail(e.target.value)} required
                    className="w-full border p-2 mb-4 rounded"
                />

                <input
                    type="password" placeholder="password" value={password}
                    onChange={(e) => setPassword(e.target.value)} required
                    className="w-full border p-2 mb-4 rounded"
                />

                <input
                    type="password" placeholder="Confirm password" value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)} required
                    className="w-full border p-2 mb-4 rounded"
                />

                <button className="bg-green-500 text-white w-full p-2 rounded hover:bg-green-600" type="submit">
                    Sign Up
                </button>

                <p className="mt-4 text-sm">
                    Already have an account?{' '}
                    <span className="text-blue-500 cursor-pointer hover:underline" onClick={() => navigate('/')}>
                        Login Here
                    </span>
                </p>

            </form>

        </div>
    )
}