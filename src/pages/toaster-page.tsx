import { Button } from "@madooei/shadcn-all-in-one/button";
import { toast } from "sonner";

const ToasterPage: React.FC = () => {
  const promise = () =>
    new Promise<{ name: string }>((resolve) =>
      setTimeout(() => resolve({ name: "Sonner" }), 2000),
    );

  return (
    <div className="p-8">
      <h1 className="text-2xl mb-4">Toast Types</h1>
      <div className="flex flex-col gap-2">
        <Button
          variant="outline"
          onClick={() => toast("Event has been created")}
        >
          Default
        </Button>
        <Button
          variant="outline"
          onClick={() =>
            toast.message("Event has been created", {
              description: "Monday, January 3rd at 6:00pm",
            })
          }
        >
          Description
        </Button>
        <Button
          variant="outline"
          onClick={() => toast.success("Event has been created")}
        >
          Success
        </Button>
        <Button
          variant="outline"
          onClick={() => toast.info("Event has been created")}
        >
          Info
        </Button>
        <Button
          variant="outline"
          onClick={() => toast.warning("Event has been created")}
        >
          Warning
        </Button>
        <Button
          variant="outline"
          onClick={() => toast.error("Event has been created")}
        >
          Error
        </Button>
        <Button
          variant="outline"
          onClick={() =>
            toast("Event has been created", {
              action: {
                label: "Undo",
                onClick: () => console.log("Undo"),
              },
            })
          }
        >
          Action
        </Button>
        <Button
          variant="outline"
          onClick={() =>
            toast.promise(promise, {
              loading: "Loading...",
              success: (data: { name: string }) => {
                return `${data.name} toast has been added`;
              },
              error: "Error",
            })
          }
        >
          Promise
        </Button>
        <Button
          variant="outline"
          onClick={() =>
            toast(
              <div className="border-l-4 border-blue-500 pl-4">
                A toast with custom styling
              </div>,
            )
          }
        >
          Custom
        </Button>
      </div>
    </div>
  );
};

export default ToasterPage;
