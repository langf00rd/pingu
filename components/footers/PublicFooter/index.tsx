import { Button } from "@/components/ui/Button";
import WidthConstraint from "@/layouts/widthConstraint";
import { ROUTES } from "@/routes";
import Link from "next/link";

export default function PublicFooter(props: { blogName?: string }): JSX.Element {
  return (
    <footer className="border-t text-center text-sm space-y-3 py-3 mt-20">
      <WidthConstraint className="max-w-[1200px]">
        <ul className="flex flex-col md:flex-row items-center md:justify-between gap-5">
          <li>
            <p>
              &copy;{new Date().getFullYear()}&nbsp;
              {props.blogName}
            </p>
          </li>
          <li>
            <Link rel="noreferrer" target="_blank" href={ROUTES.new}>
              <Button>Publish with pingu</Button>
            </Link>
          </li>
          <li>
            <p>
              Powered by&nbsp;
              <Link href={ROUTES.socials.twitter} className="underline">
                Pingu Labs&nbsp;
              </Link>
              - a blogging app
            </p>
          </li>
        </ul>
      </WidthConstraint>
    </footer>
  );
}
