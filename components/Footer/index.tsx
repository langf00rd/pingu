import { ROUTES } from "@/routes";
import Link from "next/link";

export default function Footer(): JSX.Element {
  return (
    <footer className="border-t text-center text-sm py-3 mt-10">
      <p>
        &copy; {new Date().getFullYear()}{" "}
        <Link href={ROUTES.socials.twitter} className="underline">
          Pingu Labs
        </Link>
      </p>
    </footer>
  );
}
