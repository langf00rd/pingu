import { WidthConstraint } from "@/layouts/WidthConstraint";
import prisma from "@/prisma";
import { BlogServerSideProps, IPost } from "@/types";

export async function getServerSideProps(context: BlogServerSideProps) {
  const domain = context.params.domain;
  const url = context.params.url;
  const post = await prisma.post.findFirst({
    where: {
      url: {
        equals: url,
      },
      AND: [{ subdomain: { equals: domain } }],
    },
  });
  console.log(post);
  return {
    props: { post },
  };
}

export default function ReadPost(props: { post: IPost }): JSX.Element {
  console.log(props);
  return (
    <>
      <WidthConstraint>
        <main dangerouslySetInnerHTML={{ __html: props.post.content_html }} />
      </WidthConstraint>
    </>
  );
}
