import PostCard from "@/components/PostCard";
import { BlogProps } from "@/interface";
import WidthConstraint from "@/layouts/widthConstraint";
import prisma from "@/prisma";
import { BlogServerSideProps } from "@/types";

export async function getServerSideProps(context: BlogServerSideProps) {
  console.log(context.params);
  const domain = context.params.domain;
  const blog = await prisma.blog.findFirst({ where: { sub_domain: { equals: domain } } });
  console.log(blog);
  const posts = await prisma.post.findMany({
    where: {
      parent_id: {
        equals: blog?.id,
      },
    },
  });
  console.log(posts);
  // console.log(posts[0].created_at?.toString());
  // const posts = await prisma.post.findMany({
  //   where: { parent_id: { equals: blog?.id } },
  // });
  const _ = JSON.parse(JSON.stringify({ ...blog, posts }));

  return {
    props: { post: _ },
  };
}

export default function Blog(props: { post: BlogProps }): JSX.Element {
  console.log(props.post);
  return (
    <>
      <div className="dotted-bg">
        <div className="bg-white shadow-sm border-b">
          <WidthConstraint>
            <div className="py-20">
              <h1 className="text-4xl">{props.post.name}</h1>
            </div>
          </WidthConstraint>
        </div>
        <WidthConstraint>
          {props.post.posts.length > 0 ? (
            <ul className="grid gap-5">
              {props.post.posts.map((post, index) => (
                <PostCard
                  page={`${props.post.sub_domain}/${post.slug}`}
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
