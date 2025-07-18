import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import toast from "react-hot-toast";
import { Recipe } from "../types";

const EditRecipePage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [currentImageUrl, setCurrentImageUrl] = useState<string | undefined>(
    undefined
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await api.get<Recipe>(`/recipes/${id}`);
        const recipe = response.data;
        setTitle(recipe.title);
        setDescription(recipe.description || "");
        setIngredients(recipe.ingredients.join(", "));
        setInstructions(recipe.instructions);
        setCurrentImageUrl(recipe.imageUrl);
      } catch (error) {
        toast.error("Could not load recipe data.");
        console.error(error);
        navigate("/");
      } finally {
        setIsFetching(false);
      }
    };
    fetchRecipe();
  }, [id, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    let imageUrl = currentImageUrl;

    if (imageFile) {
      const formData = new FormData();
      formData.append("file", imageFile);
      formData.append("upload_preset", "recipes");

      try {
        const response = await fetch(
          `https://api.cloudinary.com/v1_1/dxxohv4f7/image/upload`,
          { method: "POST", body: formData }
        );
        const data = await response.json();
        imageUrl = data.secure_url;
      } catch (error) {
        toast.error("Image upload failed.");
        console.error(error);

        setIsLoading(false);
        return;
      }
    }

    try {
      const ingredientsArray = ingredients
        .split(",")
        .map((item) => item.trim());
      await api.put(`/recipes/${id}`, {
        title,
        description,
        ingredients: ingredientsArray,
        instructions,
        imageUrl,
      });

      toast.success("Recipe updated successfully!");
      navigate(`/recipe/${id}`);
    } catch (error) {
      toast.error("Failed to update recipe.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching) {
    return <div className="text-center">Loading recipe for editing...</div>;
  }

  return (
    <div className="mx-auto max-w-2xl">
      <h2 className="text-center text-3xl font-bold text-gray-800">
        Edit Recipe
      </h2>
      <form
        onSubmit={handleSubmit}
        className="mt-8 space-y-6 rounded-md bg-white p-8 shadow-sm"
      >
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          ></textarea>
        </div>

        <div>
          <label
            htmlFor="ingredients"
            className="block text-sm font-medium text-gray-700"
          >
            Ingredients (comma-separated)
          </label>
          <input
            id="ingredients"
            type="text"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label
            htmlFor="instructions"
            className="block text-sm font-medium text-gray-700"
          >
            Instructions
          </label>
          <textarea
            id="instructions"
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            rows={6}
            className="mt-1 block w-full rounded-md border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          ></textarea>
        </div>

        <div>
          <label
            htmlFor="image"
            className="block text-sm font-medium text-gray-700"
          >
            Change Image
          </label>
          {currentImageUrl && !imageFile && (
            <img
              src={currentImageUrl}
              alt="Current recipe"
              className="mt-2 h-32 w-auto rounded"
            />
          )}
          <input
            id="image"
            type="file"
            accept="image/*"
            onChange={(e) => e.target.files && setImageFile(e.target.files[0])}
            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-400"
        >
          {isLoading ? "Saving Changes..." : "Update Recipe"}
        </button>
      </form>
    </div>
  );
};

export default EditRecipePage;
