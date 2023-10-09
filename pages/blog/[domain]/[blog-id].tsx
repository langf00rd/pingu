import Header from "@/components/Header";
import { Button } from "@/components/ui/Button";
import { useState } from "react";
import { BlogSettings } from "@/components/tabs/BlogSettings";
import Footer from "@/components/footers/Footer";
import { IServerSideProps, IPost } from "@/types";
import prisma from "@/prisma";
import { Posts } from "@/components/tabs/Posts/[domain]";
import { useParams } from "next/navigation";
import AuthLayout from "@/layouts/authLayout";
import { Library, Settings2, TrendingUp } from "lucide-react";
import Analytics from "@/components/tabs/Analytics";

const TABS: { label: string; icon: JSX.Element }[] = [
  { label: "Posts", icon: <Library size={17} /> },
  { label: "Analytics", icon: <TrendingUp size={17} /> },
  { label: "Settings", icon: <Settings2 size={17} /> },
];

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
      case TABS[1]:
        return <Analytics />;
      case TABS[2]:
        return <BlogSettings />;
      default:
        return <></>;
    }
  }

  return (
    <>
      <AuthLayout>
        <div className="dotted-bg">
          <Header>
            <ul className="flex items-center justify-center relative z-10">
              {TABS.map((tab) => (
                <li key={tab.label}>
                  <Button
                    onClick={() => setSelectedTab(tab)}
                    variant="ghost"
                    size="md"
                    className={`w-[120px] h-[70px] border-transparent flex items-center space-x-1 border-b-2 rounded-none ${
                      selectedTab === tab && "border-primary text-primary"
                    }`}
                  >
                    {tab.icon}
                    <p className="text-center">{tab.label}</p>
                  </Button>
                </li>
              ))}
            </ul>
          </Header>
          {tabViews()}
          <Footer />
        </div>
      </AuthLayout>
    </>
  );
}
