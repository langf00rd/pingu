import Meta from "@/components/Meta";
import PublicFooter from "@/components/footers/PublicFooter";
import { Button } from "@/components/ui/Button";
import WidthConstraint from "@/layouts/widthConstraint";
import prisma from "@/prisma";
import { IServerSideProps, IPost } from "@/types";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useRouter } from "next/router";

export default function ReadPost(props: { post: IPost }): JSX.Element {
  const params = useParams();
  const { push } = useRouter();

  // if (!props.post) {
  //   return <h1>Post does not exist</h1>;
  // }

  if (!props.post || !params) return <></>;

  return (
    <>
      <Meta
        title={props.post.meta.title}
        description={props.post.meta.description}
        imageAlt={`${props.post.meta.title} banner image`}
      />
      <WidthConstraint>
        <div className="py-10 space-y-10">
          <Button
            onClick={() => push(`/${params.domain}`)}
            className="gap-3 px-0"
            variant="ghost"
          >
            <ArrowLeft size={20} />
            go to blog
          </Button>
          <h1 className="text-3xl">{props.post.title}</h1>
          <ul className="flex items-center">
            <li className="flex items-center space-x-1">
              <Image
                width={25}
                height={25}
                className="rounded-full"
                src={props.post.author?.photo as string}
                alt={`${props.post.author?.name}'s phoro`}
              />
              <p>{props.post.author?.name}&nbsp;·&nbsp;</p>
            </li>
            {props.post.show_stats && <li>2.3K views&nbsp;·&nbsp;</li>}
            <li>10mins read&nbsp;·&nbsp;</li>
            <li>
              {new Date(props.post.created_at ?? "").toDateString().substring(0, 15)}
            </li>
          </ul>
          {props.post.banner && (
            <Image
              src={props.post.banner}
              className="rounded-2xl"
              alt={`banner for post ${props.post.title}`}
              width={1000}
              height={1000}
            />
          )}
        </div>
        <main
          className="post-content"
          dangerouslySetInnerHTML={{ __html: props.post.content_html }}
        />
      </WidthConstraint>
      <PublicFooter blogName={`${params.domain.toString().replaceAll("-", " ")} blog`} />
    </>
  );
}

export async function getStaticPaths() {
  return {
    paths: ["/[domain]/[slug]"],
    fallback: true,
  };
}

export async function getStaticProps(context: IServerSideProps) {
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
