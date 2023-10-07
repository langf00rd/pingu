import { cn } from "@/lib/utils";
import { ReactNode } from "react";
export default function WidthConstraint(props: {
  children?: ReactNode;
  className?: string;
}): JSX.Element {
  return (
    <div className={cn("p-5 max-w-4xl mx-auto", props.className)}>{props.children}</div>
  );
}
