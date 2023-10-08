import Footer from "@/components/footers/Footer";
import Meta from "@/components/Meta";
import PostCard from "@/components/PostCard";
import PublicFooter from "@/components/footers/PublicFooter";
import { Button } from "@/components/ui/Button";
import { BlogProps } from "@/interface";
import WidthConstraint from "@/layouts/widthConstraint";
import prisma from "@/prisma";
import { ROUTES } from "@/routes";
import { IServerSideProps } from "@/types";
import Link from "next/link";
import Image from "next/image";

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
            <></>
          )}
        </WidthConstraint>
        <PublicFooter blogName={props.blog.name} />
        {/* <div className="bg-white shadow-sm border-b">
          <WidthConstraint>
            <div className="py-20">
              <h1 className="text-4xl">{props.blog.name}</h1>
            </div>
          </WidthConstraint>
        </div> */}
        {/* <WidthConstraint>
          {props.blog.posts.length > 0 ? (
            <ul className="grid grid-cols-2 gap-5">
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
        </WidthConstraint> */}
      </div>
    </>
  );
}
