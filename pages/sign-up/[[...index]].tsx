import Meta from "@/components/Meta";
import { ROUTES } from "@/routes";
import { SignUp } from "@clerk/nextjs";

const SignUpPage = () => (
  <div className="w-screen h-screen flex items-center justify-center dotted-bg">
    <Meta title="pingu - Sign up" />
    <SignUp path={ROUTES.signUp} routing="path" signInUrl={ROUTES.signIn} />
  </div>
);

export default SignUpPage;
