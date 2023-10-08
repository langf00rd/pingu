import Header from "@/components/Header";
import { Button } from "@/components/ui/Button";
import { useState } from "react";
import { BlogSettings } from "@/components/tabs/BlogSettings";
import Footer from "@/components/footers/Footer";
import { IServerSideProps, IPost } from "@/types";
import prisma from "@/prisma";
import { Posts } from "@/components/tabs/Posts/[domain]";
import Meta from "@/components/Meta";
import { useParams } from "next/navigation";

const TABS = ["Drafts", "Analytics", "Settings"];

export async function getServerSideProps(context: IServerSideProps) {
  const posts = await prisma.post.findMany({
    where: {
      parent_id: {
        equals: context.params["blog-id"],
      },
    },
  });
  return {
    props: { posts: JSON.parse(JSON.stringify(posts)) },
  };
}

export default function Site(props: { posts: IPost[] }): JSX.Element {
  const params = useParams();
  const [selectedTab, setSelectedTab] = useState(TABS[0]);

  console.log(params);

  function tabViews(): JSX.Element {
    switch (selectedTab) {
      case TABS[0]:
        return <Posts posts={props.posts} />;
      case TABS[2]:
        return <BlogSettings />;
      default:
        return <></>;
    }
  }

  return (
    <>
      <div className="dotted-bg">
        <Header>
          <ul className="flex items-center justify-center relative z-10">
            {TABS.map((tab) => (
              <li key={tab}>
                <Button
                  onClick={() => setSelectedTab(tab)}
                  variant="ghost"
                  size="md"
                  className={`w-[120px] h-[70px] border-transparent border-b-2 rounded-none ${
                    selectedTab === tab && "border-primary text-primary"
                  }`}
                >
                  <p className="text-center">{tab}</p>
                </Button>
              </li>
            ))}
          </ul>
        </Header>
        {tabViews()}
        <Footer />
      </div>
    </>
  );
}
