import Meta from "@/components/Meta";
import WriteAside from "@/components/WriteAside";
import { useStore } from "@/config/store";
import AuthLayout from "@/layouts/authLayout";
import WidthConstraint from "@/layouts/widthConstraint";
import prisma from "@/prisma";
import { IServerSideProps, IPost, JSONContent } from "@/types";
import { Menu } from "lucide-react";
import { useParams } from "next/navigation";
import { Editor as NovelEditor } from "novel";
import { useState } from "react";

export async function getServerSideProps(context: IServerSideProps) {
  const post = await prisma.post.findFirst({
    where: {
      id: {
        equals: context.params.id,
      },
    },
  });
  return {
    props: { data: JSON.parse(JSON.stringify(post)) },
  };
}

export default function Write(props: { data: IPost }) {
  const params = useParams();
  const setShowWriteAside = useStore((state) => state.setShowWriteAside);
  const showWriteAside = useStore((state) => state.showWriteAside);
  const [title, setTitle] = useState(props.data?.title ?? "");
  const [subtitle, setSubTitle] = useState(props.data?.sub_title ?? "");
  const [contentHTML, setContentHTML] = useState(props.data?.content_html ?? "");
  const [contentJSON, setContentJSON] = useState<JSONContent>(
    props.data?.content_json ?? {}
  );

  console.log(params);

  // if (props.data && isOwner === false) {
  //   return <h2>You are unauthorized to edit this</h2>;
  // }

  return (
    <>
      <Meta title={`write - ${params.domain} - ${title}`} />
      <AuthLayout>
        <div className="dotted-bg">
          <header className="h-[70px] w-screen fixed top-0 left-0">
            <div className="h-full w-full flex items-center justify-between px-5">
              <Menu
                className="hover:text-primary cursor-pointer"
                onClick={() => setShowWriteAside(!showWriteAside)}
              />
            </div>
          </header>
          <WriteAside
            data={props.data}
            contentHTML={contentHTML}
            contentJSON={contentJSON}
            subtitle={subtitle}
            title={title}
          />
          <WidthConstraint className="max-w-[1050px] mt-10 space-y-5">
            <input
              value={title}
              className="text-4xl font-[600] text-black outline-none w-full tracking-tight"
              placeholder="Post title here..."
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              value={subtitle}
              className="text-xl text-black outline-none w-full tracking-tight"
              placeholder="Type post subtitle here"
              onChange={(e) => setSubTitle(e.target.value)}
            />
          </WidthConstraint>
          <NovelEditor
            className="w-screen mt-10 max-w-[1100px] mx-auto"
            disableLocalStorage
            defaultValue={contentJSON}
            onUpdate={(e) => {
              setContentJSON(e?.getJSON() ?? {});
              setContentHTML(e?.getHTML() ?? "");
            }}
          />
        </div>
      </AuthLayout>
    </>
  );
}
