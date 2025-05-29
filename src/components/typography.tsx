import { cn } from "@/lib/utils";
import type { PropsWithChildren } from "react";

const Typography = ({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) => {
  return <div className={cn("typography", className)}>{children}</div>;
};

export default Typography;
