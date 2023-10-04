import { ROUTES } from "@/routes";
import { SignIn } from "@clerk/nextjs";

const SignInPage = () => (
  <div className="w-screen h-screen flex items-center justify-center dotted-bg">
    <SignIn
      path={ROUTES.signIn}
      routing="path"
      afterSignInUrl={ROUTES.dashboard}
      signUpUrl={ROUTES.signUp}
    />
  </div>
);

export default SignInPage;
