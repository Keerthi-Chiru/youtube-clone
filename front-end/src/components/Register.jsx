import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  // State to hold form input values
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  // Handle input change and update state
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submit to register a new user
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
      }

      alert("User registered successfully");

      // Redirect to login page after successful registration
      navigate("/login");
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  return (
    <>
      {/* Registration form container */}
      <div className="mt-20 flex items-center justify-center bg-gray-100">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded shadow-md w-full max-w-md"
        >
          <h1 className="text-2xl text-red-500 font-bold mb-6 text-center">
            Register new user
          </h1>

          {/* Username input */}
          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={handleChange}
            required
            className="w-full mb-4 px-4 py-2 border border-gray-300 rounded"
          />

          {/* Email input */}
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
            className="w-full mb-4 px-4 py-2 border border-gray-300 rounded"
          />

          {/* Password input */}
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
            className="w-full mb-6 px-4 py-2 border border-gray-300 rounded"
          />

          {/* Submit button */}
          <button
            type="submit"
            className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-700"
          >
            Register
          </button>

          {/* Link to login page */}
          <p className="text-sm text-center mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </>
  );
}
