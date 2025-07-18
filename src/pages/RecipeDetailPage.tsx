import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import { Recipe } from "../types";
import toast from "react-hot-toast";

const RecipeDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipe = async () => {
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
    };

    if (id) {
      fetchRecipe();
    }
  }, [id]);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (!recipe) {
    return <div className="text-center">Recipe not found.</div>;
  }

  return (
    <div className="mx-auto max-w-4xl px-4">
      <div className="rounded-lg bg-white p-8 shadow-lg">
        <h1 className="mb-4 text-4xl font-bold text-gray-900">
          {recipe.title}
        </h1>
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
      </div>
    </div>
  );
};

export default RecipeDetailPage;
