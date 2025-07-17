import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css';

export default function Login() {

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res =  await fetch("http://localhost:5000/api/auth/login", {
                method: "POST",
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify(formData),
        });

        const data = await res.json();
        if(!res.ok) {
            throw new Error(data.message);

        }

        alert("Login Successful");
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/");
    }catch (error) {
        alert("Error: " + error.message);
    }
};
    return (
        <>
            <div className="mt-25 flex items-center justify-center bg-gray-100">
            <form onSubmit={handleLogin} className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <h1 className="text-2xl text-red-500 font-bold mb-6 text-center">Login to your account</h1>
                <input type='email' name='email' placeholder='Please enter your email' onChange={handleChange} className="w-full mb-4 px-4 py-2 border border-gray-300 rounded" required />
                <input type='password' name='password' placeholder='Please enter your password' onChange={handleChange} className="w-full mb-6 px-4 py-2 border border-gray-300 rounded" required />
                <button type='submit' className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-700">Login</button>
                <p className="text-sm text-center mt-4">Don't have an account? <Link to="/register" className="text-blue-600 underline">Register</Link></p>  
                </form>
                </div>
        </>
    )
}