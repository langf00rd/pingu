import Meta from "@/components/Meta";
import PublicFooter from "@/components/footers/PublicFooter";
import { BlogProps } from "@/interface";
import WidthConstraint from "@/layouts/widthConstraint";
import prisma from "@/prisma";
import { IServerSideProps } from "@/types";
import Link from "next/link";

export default function Blog(props: { blog: BlogProps }): JSX.Element {
  console.log(props);
  if (!props.blog) return <></>;
  return (
    <>
      <Meta
        title={props.blog.name}
        image={props.blog.banner}
        description={props.blog.description}
        imageAlt={`${props.blog.name} banner image`}
      />
      <div>
        <div className="border-b py-10 mb-10 bg-black">
          <WidthConstraint className="max-w-[1200px]">
            <h1 className="text-2xl md:text-4xl text-white">{props.blog.name}</h1>
          </WidthConstraint>
        </div>
        <WidthConstraint className="max-w-[1200px]">
          {props.blog.posts.length > 0 ? (
            <ul className="grid md:grid-cols-2 gap-10">
              {props.blog.posts.map((post, index) => (
                <li key={index} className="border-b pb-10 md:pb-0 md:border-b-0">
                  <Link
                    className="space-y-3 group"
                    href={`${props.blog.sub_domain}/${post.slug}`}
                  >
                    <h2 className="text-xl md:text-[1.5rem] group-hover:text-primary transition-colors">
                      {post.title}
                    </h2>
                    <ul className="flex space-x-3 text-textAccent2 text-sm">
                      {post.show_stats && <li>2.3K views</li>}
                      <li>10mins read</li>
                      <li>
                        {new Date(post.created_at ?? "").toDateString().substring(0, 15)}
                      </li>
                    </ul>
                    <p className="line-clamp-3">{post.meta.description}</p>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <h2>There are no posts</h2>
          )}
        </WidthConstraint>
        <PublicFooter blogName={props.blog.name} />
      </div>
    </>
  );
}

export async function getStaticPaths() {
  return {
    paths: ["/domain"],
    fallback: true,
  };
}

export async function getStaticProps(context: IServerSideProps) {
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
