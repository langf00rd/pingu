import { Button } from "@/components/ui/Button";
import WidthConstraint from "@/layouts/widthConstraint";
import { ROUTES } from "@/routes";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { ArrowRightIcon, Github, Twitter } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <main className="dotted-bg min-w-screen min-h-screen flex items-center justify-center flex-col">
        <WidthConstraint className="space-y-5">
          <h1 className="text-4xl md:text-[3rem]">
            Blogging made easy!
          </h1>
            <h1 className="text-primary text-4xl md:text-[3rem]">Write just like the pros!</h1>
          <h3 className="text-xl">It&apos;s simple:</h3>
          <ul className="flex items-center flex-wrap gap-5">
            <li className="bg-gray-50 p-5 rounded-2xl">
              <p className="md:text-xl">01 Create a publication</p>
            </li>
            <ArrowRightIcon className="hidden md:block" />
            <li className="bg-gray-50 p-5 rounded-2xl">
              <p className="md:text-xl">02 Write post</p>
            </li>
            <ArrowRightIcon className="hidden md:block" />
            <li className="bg-gray-50 p-5 rounded-2xl">
              <p className="md:text-xl">03 Publish</p>
            </li>
            <ArrowRightIcon className="hidden md:block" />
            <li className="bg-gray-50 p-5 rounded-2xl">
              <p className="md:text-xl">04 Share</p>
            </li>
          </ul>
          <div>
            <SignedIn>
              <Link href={ROUTES.dashboard}>
                <Button className="md:text-xl md:p-7">Dashboard</Button>
              </Link>
            </SignedIn>
            <SignedOut>
              <Link href={ROUTES.auth}>
                <Button className="md:text-xl md:p-7">Get started</Button>
              </Link>
            </SignedOut>
          </div>
          <div className="flex items-center gap-20">
            <p>#WIP</p>
            <ul className="flex items-center gap-3">
              <li>
                <Link href={ROUTES.socials.twitter}>
                  <Twitter stroke="#000" />
                </Link>
              </li>
              <li>
                <Link href={ROUTES.socials.github}>
                  <Github stroke="#000" />
                </Link>
              </li>
            </ul>
          </div>
        </WidthConstraint>
      </main>
    </>
  );
}
