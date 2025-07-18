import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-blue-600">
            FlavorAI
          </Link>
          <div className="flex items-center space-x-4">
            <Link
              to="/login"
              className="rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
            >
              Log In
            </Link>
            <Link
              to="/register"
              className="rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              Registration
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
