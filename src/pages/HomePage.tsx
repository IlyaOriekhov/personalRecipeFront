import { useState, useEffect } from "react";
import api from "../services/api";
import { Recipe } from "../types";
import RecipeCard from "../components/RecipeCard";
import toast from "react-hot-toast";

const HomePage = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        setLoading(true);
        const response = await api.get("/recipes");
        setRecipes(response.data);
      } catch (error) {
        toast.error("Could not fetch recipes.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  if (loading) {
    return <div className="text-center">Loading recipes...</div>;
  }

  return (
    <div className="mx-auto max-w-7xl px-4">
      <h1 className="mb-8 text-3xl font-bold text-gray-900">
        Discover Recipes
      </h1>

      {recipes.length === 0 ? (
        <p>No recipes found. Why not add one?</p>
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
