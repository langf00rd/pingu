import Meta from "@/components/Meta";
import PublicFooter from "@/components/footers/PublicFooter";
import { Button } from "@/components/ui/Button";
import { BlogProps } from "@/interface";
import WidthConstraint from "@/layouts/widthConstraint";
import prisma from "@/prisma";
import { IServerSideProps } from "@/types";
import { Field, Form, Formik } from "formik";
import Link from "next/link";
import { toast } from "sonner";

export default function Blog(props: { blog: BlogProps }): JSX.Element {
  function subscribeToNewsLetter() {
    toast.success(`You have subscribed to ${props.blog.name}'s newsletter`);
  }

  if (!props.blog) return <></>;
  return (
    <>
      <Meta
        title={props.blog.name}
        image={props.blog.banner}
        description={props.blog.description}
        imageAlt={`${props.blog.name} banner image`}
      />
      <div className="space-y-10">
        <div className="border-b py-10 bg-black">
          <WidthConstraint className="max-w-[1200px] px-5">
            <h1 className="text-2xl md:text-4xl text-white">{props.blog.name}</h1>
          </WidthConstraint>
        </div>
        <WidthConstraint className="max-w-[1200px] px-5">
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
        <div className="bg-slate-50 py-20 text-center">
          <WidthConstraint className="space-y-5 max-w-[600px] px-5">
            <h2 className="text-3xl">Subscribe to the newsletter</h2>
            <p>
              Your trusted source for wide-ranging perspectives, thought-provoking
              analysis, and deep insights that resonate.
            </p>
            <Formik onSubmit={subscribeToNewsLetter} initialValues={{ email: "" }}>
              {({ values }) => (
                <Form>
                  <div className="bg-slate-100 border rounded-full flex items-center p-1 px-2">
                    <Field
                      className="bg-transparent p-2 px-3 w-full rounded-full border-none outline-0"
                      name="email"
                      id="email"
                      type="email"
                      placeholder="john@pingu.sh"
                    />
                    <Button disabled={!values.email} className="rounded-full">
                      Submit
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </WidthConstraint>
        </div>
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
