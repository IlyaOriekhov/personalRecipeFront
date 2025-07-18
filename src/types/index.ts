export interface Recipe {
  id: number;
  title: string;
  description: string | null;
  ingredients: string[];
  instructions: string;
  author: {
    name: string | null;
  };
}
