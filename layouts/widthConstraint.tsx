import { PropsWithChildren } from "react";
export function DashboardWidthConstraint(props: PropsWithChildren): JSX.Element {
  return <div className="p-5 max-w-4xl mx-auto">{props.children}</div>;
}
