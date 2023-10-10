import Meta from "@/components/Meta";
import PostCard from "@/components/cards/PostCard";
import { Button } from "@/components/ui/Button";
import WidthConstraint from "@/layouts/widthConstraint";
import { generate12ByteID } from "@/lib/utils";
import { ROUTES } from "@/routes";
import { IPost } from "@/types";
import Link from "next/link";
import { useParams } from "next/navigation";

export function Posts(props: { posts: IPost[] }): JSX.Element {
  const params = useParams();
  return (
    <>
      <Meta title={`${params.domain.toString().replaceAll("-", " ")} - Posts`} />
      <WidthConstraint className="grid space-y-10">
        {props.posts.length > 0 ? (
          <ul className="grid md:grid-cols-2 gap-5">
            {props.posts.map((post, index) => (
              <PostCard
                page={`${ROUTES.write}/${params.domain}/${params["pub-id"]}/${post.id}`}
                data={post}
                index={index}
                key={index}
              />
            ))}
          </ul>
        ) : (
          <div className="py-10 flex items-center justify-center flex-col space-y-3">
            <p className="text-center">You don&apos;t have any posts yet!</p>
            <Link
              href={`${ROUTES.write}/${params.domain}/${
                params["pub-id"]
              }/${generate12ByteID()}`}
            >
              <Button variant="outline">New post</Button>
            </Link>
          </div>
        )}
      </WidthConstraint>
    </>
  );
}
