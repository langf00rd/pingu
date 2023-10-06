import PostCard from "@/components/PostCard";
import { Button } from "@/components/ui/Button";
import { WidthConstraint } from "@/layouts/WidthConstraint";
import { generate12ByteID } from "@/lib/utils";
import { ROUTES } from "@/routes";
import { IPost } from "@/types";
import Link from "next/link";
import { useParams } from "next/navigation";

export function Posts(props: { posts: IPost[] }): JSX.Element {
  const params = useParams();
  console.log(params);
  return (
    <WidthConstraint>
      {props.posts.length > 0 ? (
        <ul className="grid gap-5">
          {props.posts.map((post, index) => (
            <PostCard
              page={`${ROUTES.write}/${params?.domain}/${params?.id}/${post.id}`}
              data={post}
              index={index}
              key={index}
            />
          ))}
        </ul>
      ) : (
        <>
          <Link
            href={`${ROUTES.write}/${params?.domain}/${params?.id}/${generate12ByteID()}`}
          >
            <Button>Write a post</Button>
          </Link>
        </>
      )}
    </WidthConstraint>
  );
}
