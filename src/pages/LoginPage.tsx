import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { isAxiosError } from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../hooks/useAuth";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await api.post("/auth/login", { email, password });
      const token = response.data.token;

      await login(token);

      toast.success("Successfully logged in!");
      navigate("/");
    } catch (err) {
      if (isAxiosError(err) && err.response) {
        toast.error(err.response.data.message || "Login failed.");
      } else {
        toast.error("An unknown error occurred.");
      }
      console.error(err);
    }
  };

  return (
    <div className="mx-auto max-w-md">
      <h2 className="text-center text-2xl font-bold text-gray-800">Log In</h2>
      <form
        onSubmit={handleSubmit}
        className="mt-8 space-y-6 rounded-md bg-white p-8 shadow-sm"
      >
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email Address
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Log In
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
