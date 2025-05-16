import { Button } from "@/components/ui/button";
import BaseLayout from "@/layout/base";
function App() {
  return (
    <BaseLayout>
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold my-4">Hello World</h1>
        <Button>Shadcn Button</Button>
      </div>
    </BaseLayout>
  );
}

export default App;
