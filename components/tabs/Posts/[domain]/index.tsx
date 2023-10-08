import Meta from "@/components/Meta";
import PostCard from "@/components/PostCard";
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
        {props.posts.length > 0 && (
          <ul className="grid grid-cols-2 gap-5">
            {props.posts.map((post, index) => (
              <PostCard
                page={`${ROUTES.write}/${params.domain}/${params["blog-id"]}/${post.id}`}
                data={post}
                index={index}
                key={index}
              />
            ))}
          </ul>
        )}
        <Link
          href={`${ROUTES.write}/${params.domain}/${
            params["blog-id"]
          }/${generate12ByteID()}`}
          className="text-center"
        >
          <Button>Write a post</Button>
        </Link>
      </WidthConstraint>
    </>
  );
}
