import { BlogProps } from "@/interface";
import prisma from "@/prisma";
import { BlogServerSideProps } from "@/types";

export async function getServerSideProps(context: BlogServerSideProps) {
  const domain = context.params.domain;
  const blog = await prisma.blog.findFirst({ where: { subdomain: { equals: domain } } });
  const _ = { ...blog, posts: [] } as BlogProps;
  return {
    props: _,
  };
}

export default function Blog(props: BlogProps): JSX.Element {
  return (
    <>
      <div>
        <h1 className="text-3xl">{props.title}</h1>
      </div>
    </>
  );
}
