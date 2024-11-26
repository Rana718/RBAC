import { useNavigate } from "react-router-dom";

const LandingPage = () => {
    const navigate = useNavigate();

    const handleRedirect = () => {
        navigate("/signin");
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 flex flex-col items-center justify-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-8 animate-fade-in">
                Welcome to Our Platform
            </h1>
            <p className="text-lg md:text-xl mb-6 text-center max-w-2xl">
                Experience the best solutions for your needs. Sign in and get started
                today!
            </p>
            <button
                onClick={handleRedirect}
                className="px-6 py-3 bg-white text-blue-500 font-semibold rounded-lg shadow-md hover:bg-gray-100 transition-transform transform hover:scale-105 animate-bounce"
            >
                Get Started
            </button>
        </div>
    );
};

export default LandingPage;
