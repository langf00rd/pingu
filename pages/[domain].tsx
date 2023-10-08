import Meta from "@/components/Meta";
import PostCard from "@/components/PostCard";
import { BlogProps } from "@/interface";
import WidthConstraint from "@/layouts/widthConstraint";
import prisma from "@/prisma";
import { IServerSideProps } from "@/types";

export async function getServerSideProps(context: IServerSideProps) {
  const domain = context.params.domain;
  const blog = await prisma.blog.findFirst({ where: { sub_domain: { equals: domain } } });
  const posts = await prisma.post.findMany({
    where: {
      parent_id: {
        equals: blog?.id,
      },
    },
  });
  const _ = JSON.parse(JSON.stringify({ ...blog, posts }));
  return {
    props: { blog: _ },
  };
}

export default function Blog(props: { blog: BlogProps }): JSX.Element {
  console.log(props);
  return (
    <>
      <Meta
        title={props.blog.name}
        image={props.blog.banner}
        description={props.blog.description}
        imageAlt={`${props.blog.name} banner image`}
      />
      <div className="dotted-bg">
        <div className="bg-white shadow-sm border-b">
          <WidthConstraint>
            <div className="py-20">
              <h1 className="text-4xl">{props.blog.name}</h1>
            </div>
          </WidthConstraint>
        </div>
        <WidthConstraint>
          {props.blog.posts.length > 0 ? (
            <ul className="grid gap-5">
              {props.blog.posts.map((post, index) => (
                <PostCard
                  page={`${props.blog.sub_domain}/${post.slug}`}
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
