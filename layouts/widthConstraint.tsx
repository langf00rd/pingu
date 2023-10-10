import { cn } from "@/lib/utils";
import { ReactNode } from "react";
export default function WidthConstraint(props: {
  children?: ReactNode;
  className?: string;
}): JSX.Element {
  return (
    <div className={cn("h-full w-full max-w-4xl mx-auto", props.className)}>
      {props.children}
    </div>
  );
}
