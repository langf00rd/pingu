import { AnimatePresence, motion } from "framer-motion";
import { ROUTES } from "@/routes";
import { ChevronsLeft } from "lucide-react";
import { Button } from "../../ui/Button";
import { useStore } from "@/config/store";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { MAIN_ASIDE_NAV_LINKS } from "@/lib/constants/nav";

export default function MainAside(props: { show?: boolean }): JSX.Element {
  const { pathname } = useRouter();
  const showMainAside = useStore((state) => state.showMainAside);
  const setShowMainAside = useStore((state) => state.setShowMainAside);

  return (
    <AnimatePresence>
      {showMainAside && (
        <motion.aside
          initial={{ x: -300 }}
          animate={{ x: 0 }}
          exit={{ x: -350 }}
          transition={{ type: "just" }}
          className="w-[300px] fixed top-0 left-0 h-screen flex flex-col justify-between bg-white border-r shadow-xl p-5 z-[60]"
        >
          <div className="space-y-20">
            <div className="flex items-center justify-between">
              <Link
                href={ROUTES.dashboard}
                className="hover:opacity-50 transition-opacity"
              >
                <div className="flex items-center space-x-1">
                  <Image width="23" height="23" src="/assets/logo.png" alt="pingu logo" />
                  <h3 className="text-xl">pingu</h3>
                </div>
              </Link>
              <Button
                variant="ghost"
                onClick={() => setShowMainAside(!showMainAside)}
                className="hover:text-primary"
              >
                <ChevronsLeft size={23} />
              </Button>
            </div>
            <nav>
              <ul className="space-y-10">
                {MAIN_ASIDE_NAV_LINKS.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.page}
                      className={`flex space-x-3 hover:text-primary transition-colors ${
                        pathname === link.page && "text-primary"
                      }`}
                    >
                      <div>{link.icon}</div>
                      <p>{link.label}</p>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          <div>
            <Link href={ROUTES.new}>
              <Button className="w-full">Create a publication</Button>
            </Link>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
