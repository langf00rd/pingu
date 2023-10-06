import WidthConstraint from "@/layouts/widthConstraint";
import prisma from "@/prisma";
import { BlogServerSideProps, IPost } from "@/types";

export async function getServerSideProps(context: BlogServerSideProps) {
  const domain = context.params.domain;
  const slug = context.params.slug;
  const post = await prisma.post.findFirst({
    where: {
      slug: {
        equals: slug,
      },
      AND: [{ sub_domain: { equals: domain } }],
    },
  });
  console.log(post);
  return {
    props: { post: JSON.parse(JSON.stringify(post)) },
  };
}

export default function ReadPost(props: { post: IPost }): JSX.Element {
  console.log(props);

  if (!props.post) {
    return <h1>Post does not exist</h1>;
  }

  return (
    <>
      <WidthConstraint className="post-content">
        <h1>{props.post.title}</h1>
        <ul>
          <li>
            <p>{props.post.author}</p>
          </li>
        </ul>
        <main dangerouslySetInnerHTML={{ __html: props.post.content_html }} />
      </WidthConstraint>
    </>
  );
}
