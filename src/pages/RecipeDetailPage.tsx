import { useState, useEffect, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../services/api";
import { Recipe } from "../types";
import toast from "react-hot-toast";
import { useAuth } from "../hooks/useAuth";
import StarRating from "../components/StarRating";

const RecipeDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated, user } = useAuth();

  const fetchRecipe = useCallback(async () => {
    if (!id) return;
    try {
      setLoading(true);
      const response = await api.get(`/recipes/${id}`);
      setRecipe(response.data);
    } catch (error) {
      toast.error("Could not fetch recipe details.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchRecipe();
  }, [fetchRecipe]);

  const handleRate = async (value: number) => {
    try {
      await api.post(`/recipes/${id}/rate`, { value });
      toast.success("Thanks for your rating!");
      fetchRecipe();
    } catch (error) {
      toast.error("Failed to submit rating.");
      console.error(error);
    }
  };

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (!recipe) {
    return <div className="text-center">Recipe not found.</div>;
  }

  const averageRating =
    recipe.ratings.length > 0
      ? recipe.ratings.reduce((acc, r) => acc + r.value, 0) /
        recipe.ratings.length
      : 0;

  const placeholderImage =
    "https://via.placeholder.com/800x400.png?text=No+Image";

  return (
    <div className="mx-auto max-w-4xl px-4">
      <div className="rounded-lg bg-white p-8 shadow-lg">
        <div className="mb-6 overflow-hidden rounded-lg">
          <img
            src={recipe.imageUrl || placeholderImage}
            alt={recipe.title}
            className="h-96 w-full object-cover"
          />
        </div>

        {user && user.id === recipe.authorId && (
          <div className="mb-4 text-right">
            <Link
              to={`/recipe/${recipe.id}/edit`}
              className="rounded-md bg-gray-200 px-4 py-2 text-sm font-medium text-gray-800 transition-colors hover:bg-gray-300"
            >
              Edit Recipe
            </Link>
          </div>
        )}

        <h1 className="mb-2 text-4xl font-bold text-gray-900">
          {recipe.title}
        </h1>
        <div className="mb-6">
          <StarRating
            rating={averageRating}
            totalRatings={recipe.ratings.length}
          />
        </div>

        <p className="mb-6 text-lg text-gray-600">{recipe.description}</p>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
          <div>
            <h2 className="mb-3 text-2xl font-semibold text-gray-800">
              Ingredients
            </h2>
            <ul className="list-disc space-y-2 pl-5">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index} className="text-gray-700">
                  {ingredient}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="mb-3 text-2xl font-semibold text-gray-800">
              Instructions
            </h2>
            <div className="prose max-w-none text-gray-700">
              {recipe.instructions}
            </div>
          </div>
        </div>

        <p className="mt-8 text-right text-sm font-semibold text-gray-500">
          By {recipe.author.name || "Anonymous"}
        </p>

        {isAuthenticated && (
          <div className="mt-8 border-t pt-6">
            <h3 className="text-xl font-semibold">Rate this recipe</h3>
            <div className="flex space-x-1 mt-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => handleRate(star)}
                  className="text-3xl text-gray-300 transition-colors hover:text-yellow-400"
                >
                  ★
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecipeDetailPage;
