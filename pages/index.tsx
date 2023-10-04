import { Button } from "@/components/ui/Button";
import { ROUTES } from "@/routes";
import Link from "next/link";

export default function Home() {
  return (
    <Link href={ROUTES.auth}>
      <Button>sign in</Button>
    </Link>
  );
}
