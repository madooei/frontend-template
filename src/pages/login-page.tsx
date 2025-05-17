import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useNavigate } from "react-router";

const LoginPage: React.FC = () => {
  /*
     This hook allows the programmer to navigate the user to a new page without the user interacting.

     For normal navigation, it's best to use Link or NavLink. 
     They provide a better default user experience like keyboard events, accessibility labeling, "open in new window", right click context menus, etc.

     Reserve usage of useNavigate to situations where the user is not interacting but you need to navigate, for example:

     - After a form submission completes
     - Logging them out after inactivity
     - Timed UIs like quizzes, etc.
  */
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
    <div className="flex flex-col items-center justify-center min-h-screen gap-8">
      <h1 className="text-4xl">Login</h1>
      <Button size="lg" onClick={login} disabled={isLoading}>
        {isLoading ? "Logging in..." : "Everyone is welcome here"}
      </Button>
    </div>
  );
};

export default LoginPage;
