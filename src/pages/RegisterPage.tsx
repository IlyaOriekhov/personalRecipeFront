import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { isAxiosError } from "axios";
import toast from "react-hot-toast";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await api.post("/auth/register", {
        name,
        email,
        password,
      });

      toast.success("Account created successfully! You can now log in.");
      navigate("/login");
    } catch (err) {
      if (isAxiosError(err) && err.response) {
        toast.error(err.response.data.message || "Validation error.");
      } else {
        toast.error("An unknown error occurred. Please try again.");
      }
      console.error(err);
    }
  };

  return (
    <div className="mx-auto max-w-md">
      <h2 className="text-center text-2xl font-bold text-gray-800">
        Create an Account
      </h2>
      <form
        onSubmit={handleSubmit}
        className="mt-8 space-y-6 rounded-md bg-white p-8 shadow-sm"
      >
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>
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
            className="mt-1 block w-full rounded-md border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
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
            className="mt-1 block w-full rounded-md border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Create Account
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
