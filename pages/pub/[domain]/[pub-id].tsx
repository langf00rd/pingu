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
import { Link2, MoreVertical } from "lucide-react";
import Analytics from "@/components/tabs/Analytics";
import WidthConstraint from "@/layouts/widthConstraint";
import Link from "next/link";
import { PUB_TABS } from "@/lib/constants/nav";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/PopOver";

export default function Site(props: { posts: IPost[] }): JSX.Element {
  const params = useParams();
  const [selectedTab, setSelectedTab] = useState(PUB_TABS[0]);

  console.log(params);

  function tabViews(): JSX.Element {
    switch (selectedTab) {
      case PUB_TABS[0]:
        return <Posts posts={props.posts} />;
      case PUB_TABS[1]:
        return <Analytics />;
      case PUB_TABS[2]:
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
            <div className="flex items-center">
              <ul className="flex items-center justify-center relative z-10">
                {PUB_TABS.map((tab) => (
                  <li key={tab.label}>
                    <Button
                      onClick={() => setSelectedTab(tab)}
                      variant="tab"
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
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost">
                    <MoreVertical size={18} />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <ul>
                    <li>
                      <Link rel="noreferrer" target="_blank" href={`/${params.domain}`}>
                        <p>View publication</p>
                      </Link>
                    </li>
                  </ul>
                </PopoverContent>
              </Popover>
            </div>
          </Header>
          <main className="pt-[140px] md:pt-[80px]">{tabViews()}</main>
          <Footer />
        </div>
      </AuthLayout>
    </>
  );
}

export async function getServerSideProps(context: IServerSideProps) {
  const posts = await prisma.post.findMany({
    where: {
      parent_id: {
        equals: context.params["pub-id"],
      },
    },
  });
  return {
    props: { posts: JSON.parse(JSON.stringify(posts)) },
  };
}
