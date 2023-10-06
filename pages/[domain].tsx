import PostCard from "@/components/PostCard";
import { BlogProps } from "@/interface";
import { WidthConstraint } from "@/layouts/WidthConstraint";
import prisma from "@/prisma";
import { BlogServerSideProps } from "@/types";

export async function getServerSideProps(context: BlogServerSideProps) {
  const domain = context.params.domain;
  const blog = await prisma.blog.findFirst({ where: { subdomain: { equals: domain } } });
  const posts = await prisma.post.findMany({
    where: { parent_id: { equals: blog?.uid } },
  });
  const _ = { ...blog, posts: posts };
  return {
    props: _,
  };
}

export default function Blog(props: BlogProps): JSX.Element {
  console.log(props);
  return (
    <>
      <div className="dotted-bg">
        <div className="bg-white shadow-sm border-b">
          <WidthConstraint>
            <div className="py-20">
              <h1 className="text-4xl">{props.title}</h1>
            </div>
          </WidthConstraint>
        </div>
        <WidthConstraint>
          {props.posts.length > 0 ? (
            <ul className="grid gap-5">
              {props.posts.map((post, index) => (
                <PostCard
                  page={`${props.subdomain}/${post.url}`}
                  data={post}
                  index={index}
                  key={index}
                />
              ))}
            </ul>
          ) : (
            <></>
          )}
        </WidthConstraint>
      </div>
    </>
  );
}
