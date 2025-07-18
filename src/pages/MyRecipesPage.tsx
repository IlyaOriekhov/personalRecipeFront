import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import { Recipe } from "../types";
import RecipeCard from "../components/RecipeCard";
import toast from "react-hot-toast";

const MyRecipesPage = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        setLoading(true);
        const response = await api.get("/recipes/mine");
        setRecipes(response.data);
      } catch (error) {
        toast.error("Could not fetch your recipes.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  if (loading)
    return <div className="text-center">Loading your recipes...</div>;

  return (
    <div className="mx-auto max-w-7xl px-4">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">My Recipes</h1>
        <Link
          to="/add-recipe"
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          + Add Recipe
        </Link>
      </div>

      {recipes.length === 0 ? (
        <p className="text-center text-gray-500">
          You haven't added any recipes yet.
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

export default MyRecipesPage;
