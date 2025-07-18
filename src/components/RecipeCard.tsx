import { Link } from "react-router-dom";
import { Recipe } from "../types";

interface RecipeCardProps {
  recipe: Recipe;
}

const RecipeCard = ({ recipe }: RecipeCardProps) => {
  const placeholderImage =
    "https://via.placeholder.com/400x200.png?text=No+Image";

  return (
    <Link to={`/recipe/${recipe.id}`}>
      <div className="flex h-full flex-col overflow-hidden rounded-lg bg-white shadow-md transition-shadow duration-300 hover:shadow-xl">
        <img
          src={recipe.imageUrl || placeholderImage}
          alt={recipe.title}
          className="h-48 w-full object-cover"
        />
        <div className="flex flex-1 flex-col p-6">
          <h3 className="text-xl font-bold text-gray-800">{recipe.title}</h3>
          <p className="mt-2 flex-1 text-sm text-gray-600">
            {recipe.description || "No description available."}
          </p>
          <p className="mt-4 text-xs font-semibold text-gray-500">
            By {recipe.author.name || "Anonymous"}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default RecipeCard;
