import { useState, useEffect } from "react";
import api from "../services/api";
import { Recipe } from "../types";
import RecipeCard from "../components/RecipeCard";
import toast from "react-hot-toast";

const HomePage = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        setLoading(true);
        const endpoint = searchTerm
          ? `/recipes/search?q=${searchTerm}`
          : "/recipes";
        const response = await api.get(endpoint);
        setRecipes(response.data);
      } catch (error) {
        toast.error("Could not fetch recipes.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    const timerId = setTimeout(() => {
      fetchRecipes();
    }, 500);

    return () => clearTimeout(timerId);
  }, [searchTerm]);

  return (
    <div className="mx-auto max-w-7xl px-4">
      <h1 className="mb-4 text-3xl font-bold text-gray-900">
        Discover Recipes
      </h1>

      <div className="mb-8">
        <input
          type="search"
          placeholder="Search for recipes by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      {loading ? (
        <div className="text-center">Loading recipes...</div>
      ) : recipes.length === 0 ? (
        <p className="text-center text-gray-500">
          {searchTerm
            ? `No recipes found for "${searchTerm}"`
            : "No recipes found."}
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {recipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;
