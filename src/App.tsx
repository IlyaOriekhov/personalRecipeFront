import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import RecipeDetailPage from "./pages/RecipeDetailPage";
import MyRecipesPage from "./pages/MyRecipesPage";
import AddRecipePage from "./pages/AddRecipePage";

import ProtectedRoute from "./router/ProtectedRoute";

import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Toaster position="top-center" />
      <Navbar />
      <main className="py-10">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/recipe/:id" element={<RecipeDetailPage />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/my-recipes" element={<MyRecipesPage />} />
            <Route path="/add-recipe" element={<AddRecipePage />} />
          </Route>
        </Routes>
      </main>
    </div>
  );
}

export default App;
