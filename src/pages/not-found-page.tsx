import { Link } from "react-router";

const NotFoundPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-8">
      <h1 className="text-4xl">404 - Page Not Found</h1>
      <p className="text-lg">The page you are looking for does not exist.</p>
      <Link to="/" className="hover:underline">
        Go back to the home page
      </Link>
    </div>
  );
};

export default NotFoundPage;
