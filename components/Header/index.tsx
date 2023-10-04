import { motion } from "framer-motion";
import { ROUTES } from "@/routes";
import { UserButton, useUser } from "@clerk/nextjs";
import { Menu } from "lucide-react";
import { Button } from "../ui/Button";
import Link from "next/link";
import { useRouter } from "next/router";
import { useStore } from "@/config/store";
import Aside from "../Aside";
import { AnimatePresence } from "framer-motion";
import { ReactNode } from "react";

export default function Header(props: {
  title?: string;
  children?: ReactNode;
}): JSX.Element {
  const showMainAside = useStore((state) => state.showMainAside);
  const setShowMainAside = useStore((state) => state.setShowMainAside);
  const { pathname } = useRouter();

  return (
    <>
      <header className="h-[70px] w-screen fixed top-0 left-0 z-10">
        <div className="h-full w-full flex items-center justify-between px-5">
          <div className="flex items-center space-x-5">
            <AnimatePresence>
              {!showMainAside && (
                <motion.div
                  initial={{ x: -50 }}
                  animate={{ x: 0 }}
                  transition={{ delay: 0.1, type: "just" }}
                >
                  <Button variant="ghost" className="p-0 hover:text-primary">
                    <Menu onClick={() => setShowMainAside(!showMainAside)} />
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
            {pathname !== ROUTES.write && (
              <Link href={ROUTES.write}>
                <Button className="w-full">Write a post</Button>
              </Link>
            )}
          </div>
          <UserButton />
        </div>
      </header>
      <div
        className={`h-[70px] flex items-center px-5 justify-center bg-white md:mt-0 mt-[70px] border-b ${
          pathname.split("/").includes("write") && "border-none"
        }`}
      >
        {props.children}
        <h2 className="text-xl">{props.title}</h2>
      </div>
      <Aside />
    </>
  );
}
