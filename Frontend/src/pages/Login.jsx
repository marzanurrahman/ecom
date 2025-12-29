import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { loginSuccess } from "../store/authSlice";
import Container from "../components/Container";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password }
      );

      dispatch(
        loginSuccess({
          user: res.data.user,
          token: res.data.token,
        })
      );

      navigate("/");
    } catch (err) {
      alert("Invalid email or password");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-[70vh] flex items-center justify-center">
      <Container>
        <div className="max-w-md mx-auto bg-white border border-gray-200 rounded-lg shadow-sm p-8">
          <h1 className="text-2xl font-semibold text-center mb-6">
            Login
          </h1>

          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              required
              className="w-full border px-4 py-2 rounded-md outline-none focus:ring-2 focus:ring-slate-900"
            />

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              className="w-full border px-4 py-2 rounded-md outline-none focus:ring-2 focus:ring-slate-900"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 bg-slate-900 text-white rounded-md hover:bg-slate-800 transition disabled:opacity-60"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="text-sm text-center text-gray-500 mt-6">
            Don’t have an account?{" "}
            <Link to="/register" className="text-slate-900 font-medium">
              Register
            </Link>
          </p>
        </div>
      </Container>
    </main>
  );
};

export default Login;
