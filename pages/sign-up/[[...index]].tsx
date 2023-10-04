import { ROUTES } from "@/routes";
import { SignUp } from "@clerk/nextjs";

const SignUpPage = () => (
  <div className="w-screen h-screen flex items-center justify-center dotted-bg">
    <SignUp path={ROUTES.signUp} routing="path" signInUrl={ROUTES.signIn} />
  </div>
);

export default SignUpPage;
