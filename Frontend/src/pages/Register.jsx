import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await axios.post(
        "http://localhost:5000/api/auth/register",
        formData
      );

      navigate("/login");
    } catch (err) {
      setError(
        err?.response?.data?.message || "Registration failed. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center px-4">
      <div className="max-w-[480px] w-full bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-sm">

        <h1 className="text-3xl font-semibold text-slate-900 text-center">
          Register
        </h1>

        <form onSubmit={handleSubmit} className="mt-10 space-y-6">

          {error && (
            <p className="text-red-500 text-sm text-center">
              {error}
            </p>
          )}

          <div>
            <label className="block text-sm font-medium text-slate-900 mb-2">
              Name
            </label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-slate-300 rounded-md px-4 py-3 text-sm outline-blue-600"
              placeholder="Enter your name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-900 mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-slate-300 rounded-md px-4 py-3 text-sm outline-blue-600"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-900 mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              className="w-full border border-slate-300 rounded-md px-4 py-3 text-sm outline-blue-600"
              placeholder="Create a password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 text-sm font-medium rounded-md text-white bg-slate-800 hover:bg-slate-900 transition disabled:opacity-60"
          >
            {loading ? "Creating account..." : "Create account"}
          </button>

          <p className="text-sm text-slate-600 text-center">
            Already have an account?
            <Link
              to="/login"
              className="ml-1 text-blue-600 font-medium hover:underline"
            >
              Login here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
