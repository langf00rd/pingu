import Meta from "@/components/Meta";
import { Button } from "@/components/ui/Button";
import { ROUTES } from "@/routes";
import Link from "next/link";

export default function Auth() {
  return (
    <>
      <Meta title="pingu - Authentication" />
      <div className="w-screen h-screen flex items-center justify-center flex-col space-y-10 dotted-bg">
        <main className="border p-5 rounded-2xl shadow-xl w-full max-w-[400px] text-center space-y-8 bg-white">
          <div className="space-y-1">
            <h2 className="text-2xl">Welcome to pingu</h2>
            <p>Some cool text should come here</p>
          </div>
          <ul className="space-y-5">
            <li>
              <Link href={ROUTES.signUp}>
                <Button className="w-full">Create an account</Button>
              </Link>
            </li>
            <li>
              <Link href={ROUTES.signIn}>
                <Button variant="outline" className="w-full">
                  Log in
                </Button>
              </Link>
            </li>
          </ul>
        </main>
        <small className="max-w-sm text-center">
          By signing up or creating an account, you acknowledge that you have read and
          understood our &nbsp;
          <Link href={ROUTES.terms} className="underline hover:text-primary opacity-70">
            terms &amp; conditions
          </Link>
        </small>
      </div>
    </>
  );
}
