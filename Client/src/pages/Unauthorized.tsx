import { Link } from "react-router-dom";

const Unauthorized = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold text-red-500">
        403 - Unauthorized
      </h1>

      <p className="text-gray-500 mt-2">
        You don't have permission to access this page.
      </p>

      <Link
        to="/dashboard"
        className="mt-6 px-4 py-2 bg-blue-600 text-white rounded"
      >
        Go Back Dashboard
      </Link>
    </div>
  );
};

export default Unauthorized;