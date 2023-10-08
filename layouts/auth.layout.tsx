import { ROUTES } from "@/routes";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/router";
import { PropsWithChildren, ReactNode } from "react";

export default function AuthLayout(props: PropsWithChildren): ReactNode {
  const { userId, isLoaded } = useAuth();
  const { replace } = useRouter();

  if (isLoaded) {
    if (!userId) replace(ROUTES.auth);
    else return props.children;
  } else return <></>;
}
