# FlavorAI - Frontend

This is the client side of the FlavorAI project, built in React.js. The application provides a user interface for interacting with the [FlavorAI Backend API](https://github.com/IlyaOriekhov/personalRecipeBack) to search, create, and manage recipes.

## Technologies

- **React.js** - Library for creating user interfaces.
- **Vite** - A modern and fast tool for building the frontend.
- **TypeScript** - Typed add-on over JavaScript.
- **Tailwind CSS** - CSS framework for quick styling.
- **React Router** - For navigation and routing.
- **Axios** - For HTTP requests to the backend.
- **React Hot Toast** - To display notifications.

## Functionality

- **User authentication:** Registration, login and logout.
- **Manage recipes:** Create, read, update, and delete (CRUD) recipes.
- **Personalization:** Ability to view only your own recipes.
- **Uploading images:** Integration with Cloudinary to add photos to recipes.
- **Ratings:** 5-star recipe rating system.
- **Search:** Dynamic search for recipes by name.
- **AI Assistant:** Generate cooking tips using the Google Gemini API.

## Installation and startup

### Background

- [Node.js](https://nodejs.org/)
- Launched [FlavorAI Backend API](https://github.com/IlyaOriekhov/personalRecipeBack).

### Step-by-step instructions

1.  **Clone the repository:**

    ```bash
    git clone <URL of your repository>
    cd flavorai-frontend
    ```

2.  **Setup deps:**

    ```bash
    npm install
    ```

3.  **Customize env variables:**
    - Create an `.env` file in the project root.
    - Add your backend server address to it:
    ```env
    VITE_API_BASE_URL=http://localhost:3000/api
    ```

### Starting a server for development

Start the Vite server. The application will be available at `http://localhost:5173` (or another port specified in the terminal).

```bash
npm run dev
```

---
