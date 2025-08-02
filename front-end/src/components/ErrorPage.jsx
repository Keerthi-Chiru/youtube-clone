import { Link } from "react-router-dom";
import { FaSadTear } from "react-icons/fa";

export default function ErrorPage() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 px-4 text-center">
      <FaSadTear className="text-red-500 text-6xl mb-4" />
      <h1 className="text-4xl font-bold text-gray-800 mb-2">Oops! Page Not Found</h1>
      <p className="text-gray-600 mb-6">
        The page you're looking for doesn’t exist or has been moved.
      </p>
      <Link
        to="/"
        className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-md transition duration-200"
      >
        Go Back Home
      </Link>
    </div>
  );
}
