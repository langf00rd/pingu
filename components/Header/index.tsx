import { ROUTES } from "@/routes";
import { UserButton, useUser } from "@clerk/nextjs";
import { Menu } from "lucide-react";
import { Button } from "../ui/Button";
import Link from "next/link";
import { useRouter } from "next/router";
import { useStore } from "@/config/store";
import Aside from "../Aside";

export default function Header(): JSX.Element {
  const showMainAside = useStore((state) => state.showMainAside);
  const setShowMainAside = useStore((state) => state.setShowMainAside);
  const { pathname } = useRouter();

  return (
    <>
      <header className="h-[60px] w-screen fixed top-0 left-0 z-10">
        <div className="h-full w-full flex items-center justify-between px-5">
          <div className="flex items-center space-x-5">
            <Button variant="ghost" className="p-0">
              <Menu onClick={() => setShowMainAside(!showMainAside)} />
            </Button>
            {pathname !== ROUTES.write && (
              <Link href={ROUTES.write}>
                <Button className="w-full">Write a post</Button>
              </Link>
            )}
          </div>
          <UserButton />
        </div>
      </header>
      <Aside />
    </>
  );
}
