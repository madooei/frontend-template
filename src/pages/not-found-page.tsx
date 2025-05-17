import { cn } from "@/lib/utils";
import { DecoratedLink } from "@/components/decorated-link";

const DEBUG = false;

const NotFoundPage: React.FC = () => {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center w-full min-h-screen gap-8",
        {
          "bg-red-500": DEBUG,
        },
      )}
    >
      <h1 className="text-4xl">404 - Page Not Found</h1>
      <p className="text-lg">The page you are looking for does not exist.</p>
      <DecoratedLink to="/">Go back to the home page</DecoratedLink>
    </div>
  );
};

export default NotFoundPage;
