import Link from "next/link";
import { Button } from "../ui/Button";

export default function NoContent(props: {
  page: string;
  label: string;
  buttonLabel: string;
  buttonIcon?: JSX.Element;
}): JSX.Element {
  return (
    <div className="py-10 flex items-center justify-center flex-col space-y-3">
      <p className="text-center">{props.label}</p>
      <Link href={props.page}>
        <Button variant="outline">
          {props.buttonIcon}
          {props.buttonLabel}
        </Button>
      </Link>
    </div>
  );
}
