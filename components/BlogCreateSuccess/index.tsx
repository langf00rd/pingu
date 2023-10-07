import { ROUTES } from "@/routes";
import { Twitter, Linkedin } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/Button";
import { DialogFooter } from "../ui/Dialog";

export function BlogCreateSuccessView(props: { uid: string }): JSX.Element {
  return (
    <>
      <ul className="flex items-center space-x-5">
        <li>
          <Link href="/">
            <Twitter fill="#26a7de" strokeWidth={0} />
          </Link>
        </li>
        <li>
          <Link href="/">
            <Linkedin fill="#0072b1" strokeWidth={0} />
          </Link>
        </li>
      </ul>
      <DialogFooter>
        <Link href={`${ROUTES.blog}/${props.uid}`}>
          <Button className="w-max">Next</Button>
        </Link>
      </DialogFooter>
    </>
  );
}
