import { Link } from "react-router-dom";
import { Recipe } from "../types";

interface RecipeCardProps {
  recipe: Recipe;
}

const RecipeCard = ({ recipe }: RecipeCardProps) => {
  return (
    <Link to={`/recipe/${recipe.id}`}>
      {" "}
      <div className="overflow-hidden rounded-lg bg-white shadow-md transition-shadow duration-300 hover:shadow-xl h-full">
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-800">{recipe.title}</h3>
          <p className="mt-2 text-sm text-gray-600">
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
