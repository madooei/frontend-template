import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useNavigate } from "react-router";

const DEBUG = false;

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const login = () => {
    // Talk to the server to login
    // Simulate a short delay
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate("/");
    }, 500);
  };

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center w-full min-h-screen gap-8",
        {
          "bg-red-500": DEBUG,
        },
      )}
    >
      <h1 className="text-4xl">Login</h1>
      <Button size="lg" onClick={login} disabled={isLoading}>
        {isLoading ? "Logging in..." : "Everyone is welcome here"}
      </Button>
    </div>
  );
};

export default LoginPage;
