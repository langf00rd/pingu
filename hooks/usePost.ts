import { IPost } from "@/types";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";

export function usePost(props: IPost) {
  console.log(props);
  const { user } = useUser();
  const [isOwner, setIsOwner] = useState<boolean | undefined>();

  useEffect(() => {
    setIsOwner(props && props.author === user?.emailAddresses[0].emailAddress);
  }, [props, user?.emailAddresses]);

  return { isOwner };
}
