export interface Recipe {
  id: number;
  title: string;
  description: string | null;
  ingredients: string[];
  instructions: string;
  imageUrl?: string;
  author: {
    name: string | null;
  };
  ratings: { value: number }[];
}
