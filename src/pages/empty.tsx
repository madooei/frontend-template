import { cn } from "@madooei/shadcn-all-in-one/utils";

const DEBUG = false;

const EmptyPage: React.FC<{ message: string }> = ({ message }) => {
  return (
    <div
      className={cn("flex w-full h-full items-center justify-center p-4", {
        "border-2 border-orange-500": DEBUG,
      })}
    >
      <p className="text-lg">{message}</p>
    </div>
  );
};

export default EmptyPage;
