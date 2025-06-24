import { cn } from "@madooei/shadcn-all-in-one/utils";

interface LoadingPageProps {
  className?: string;
}

const LoadingPage: React.FC<LoadingPageProps> = ({ className }) => {
  return (
    <div
      className={cn(
        "flex justify-center items-center w-full h-full",
        className,
      )}
    >
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
      <p className="ml-3">Loading...</p>
    </div>
  );
};

export default LoadingPage;
