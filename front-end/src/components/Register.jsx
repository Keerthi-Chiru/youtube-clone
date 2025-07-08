import { useState } from "react";
import { useNavigate } from "react-router-dom";


export default function Register() {

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: ""
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("http://localhost:5000/api/auth/register", {
                method: "POST",
                headers: { 'content-type': 'application/json'},
                body: JSON.stringify(formData),
            });

            const data = await res.json();
            if(!res.ok) {
                throw new Error (data.message);

            }
            alert("User registered successfully");
            navigate("/Login");
        } catch (error) {
            alert("Error: " + error.message);
        }
    };


            return (
                <>
                    <div className="min-h-screen flex items-center justify-center bg-gray-100">
                        <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-md">
                            <h1 className="text-2xl text-red-500 font-bold mb-6 text-center">Register new user</h1>
                            <input
                                type="text"
                                name="username"
                                placeholder="Username"
                                onChange={handleChange}
                                required
                                className="w-full mb-4 px-4 py-2 border border-gray-300 rounded"
                            />
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                onChange={handleChange}
                                required
                                className="w-full mb-4 px-4 py-2 border border-gray-300 rounded"
                            />
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                onChange={handleChange}
                                required
                                className="w-full mb-6 px-4 py-2 border border-gray-300 rounded"
                            />
                            <button
                                type="submit"
                                className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-700"
                            >
                                Register
                            </button>
                            <p className="text-sm text-center mt-4">Already have an account? <a href="/login" className="text-blue-600 underline">Login</a></p>
                        </form>
                        
                    </div>
                </>
            );
}