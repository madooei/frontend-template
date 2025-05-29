import { cn } from "@/lib/utils";
import type { PropsWithChildren } from "react";

const Typography = ({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) => {
  return (
    <div className={cn("prose prose-shadcn dark:prose-invert", className)}>
      {children}
    </div>
  );
};

export default Typography;
