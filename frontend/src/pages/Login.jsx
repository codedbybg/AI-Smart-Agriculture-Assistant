import { useState } from "react";
import {Link , useNavigate } from "react-router-dom";
import Input from "../components/Input";
import Button from "../components/Button";
import { useAuth } from "../context/AuthContext";

function Login() {
  const navigate = useNavigate();

  const {login} = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error , setError]  = useState("");
  const [loading , setLoading] = useState(false);

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

    try{
      await login(
        formData.email,
        formData.password,
      );

      navigate("/dashboard");
    }catch(error){
      setError(
        error.response?.data?.message || "Login Failed"
      );
    }finally{
      setLoading(false);
    }

    // console.log(formData);
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12">

      <div className="mx-auto max-w-md rounded-2xl border bg-white p-8 shadow-sm">

        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-green-700">
            Welcome Back
          </h1>

          <p className="mt-2 text-gray-600">
            Login to AgriSmart AI
          </p>
        </div>
        {
          error && (
            <div className="mb-5 rounded-lg bg-red-50 p-3 text-sm text-red-700">
              {error}
            </div>
          )
        }

        <form onSubmit={handleSubmit} className="space-y-5">

          <Input
            label="Email"
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
          />

          <Input
            label="Password"
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
          />

          <Button 
            type="submit" 
            disabled={loading}
            className="w-full"
          >
            {
              loading
                ? "Logging in..."
                : "Login"
            }
          </Button>

        </form>
        <p className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-medium text-green-700 hover:underline"
          >
            Create Account
          </Link>
        </p>

      </div>

    </div>
  );
}

export default Login;