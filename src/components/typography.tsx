import { cn } from "@/lib/utils";
import type { PropsWithChildren } from "react";

const Typography = ({
  children,
  className,
  ...props
}: PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>) => {
  return (
    <div className={cn("typography", className)} {...props}>
      {children}
    </div>
  );
};

export default Typography;
