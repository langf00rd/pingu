import { motion } from "framer-motion";
import { UserButton } from "@clerk/nextjs";
import { Menu, Plus } from "lucide-react";
import { Button } from "../ui/Button";
import { useRouter } from "next/router";
import { useStore } from "@/config/store";
import { AnimatePresence } from "framer-motion";
import { ReactNode } from "react";
import MainAside from "../aside/MainAside";
import { ROUTES } from "@/routes";
import Link from "next/link";
import { useParams } from "next/navigation";
import { cn, generate12ByteID } from "@/lib/utils";

export default function Header(props: {
  title?: string;
  children?: ReactNode;
  className?: string;
}): JSX.Element {
  const params = useParams();
  const { pathname } = useRouter();
  const showMainAside = useStore((state) => state.showMainAside);
  const setShowMainAside = useStore((state) => state.setShowMainAside);
  return (
    <>
      <header
        className={cn(
          "h-[70px] w-screen fixed top-0 left-0 z-10 bg-white md:border-b",
          props.className
        )}
      >
        <div className="h-full w-full flex items-center justify-between px-5">
          <div className="flex items-center space-x-5">
            {!showMainAside && (
              <Button variant="ghost" className="p-0 hover:text-primary">
                <Menu onClick={() => setShowMainAside(!showMainAside)} />
              </Button>
            )}
            {pathname.split("/").includes("pub") ? (
              <Link
                href={`${ROUTES.write}/${params.domain}/${
                  params["pub-id"]
                }/${generate12ByteID()}`}
              >
                <Button>
                  <Plus size={18} />
                  Write a new post
                </Button>
              </Link>
            ) : (
              <Link href={ROUTES.new}>
                <Button>Create a publication</Button>
              </Link>
            )}
          </div>
          <UserButton />
        </div>
        <div className="w-full flex items-center justify-center border-b md:border-none mt-0 md:-mt-[70px] h-full bg-white">
          <div className="w-max">
            <h2 className="text-xl">{props.title}</h2>
            {props.children}
          </div>
        </div>
      </header>
      <MainAside />
    </>
  );
}
