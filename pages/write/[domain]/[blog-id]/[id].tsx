import WidthConstraint from "@/layouts/widthConstraint";
import prisma from "@/prisma";
import { BlogServerSideProps, IPost, JSONContent } from "@/types";
import axios from "axios";
import { useParams } from "next/navigation";
import { Editor as NovelEditor } from "novel";
import { useState } from "react";
import { toast } from "sonner";

export async function getServerSideProps(context: BlogServerSideProps) {
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
  const [saveStatus, setSaveStatus] = useState("");
  const [title, setTitle] = useState(props.data?.title ?? "");
  const [contentHTML, setContentHTML] = useState(props.data?.content_html ?? "");
  const [contentJSON, setContentJSON] = useState<JSONContent>(
    props.data?.content_json ?? {}
  );

  console.log(props);
  console.log(params);

  async function onSave() {
    const data: IPost = {
      meta: {
        title,
        image: "https://img.link",
      },
      title,
      tags: ["tag #1", "tag #2"],
      id: params["id"].toString(),
      parent_id: params["blog-id"].toString(),
      slug: title
        .replace(/[^a-zA-Z0-9]/g, "-")
        .toLowerCase()
        .trim(),
      author: "random-id",
      content_html: contentHTML,
      content_json: contentJSON,
      sub_domain: params.domain.toString(),
    };

    await axios
      .post("/api/post/create", data)
      .then((res) => {
        toast.success(res.data.message);
      })
      .catch((error) => {
        console.log(error.message);
        toast.error(error.message);
      });
  }

  // if (props.data && isOwner === false) {
  //   return <h2>You are unauthorized to edit this</h2>;
  // }

  return (
    <div className="dotted-bg">
      <WidthConstraint className="max-w-5xl">
        <p>{saveStatus}</p>
        <input
          value={title}
          className="text-4xl font-[600] text-black outline-none w-full tracking-tight"
          placeholder="Post title here..."
          onChange={(e) => setTitle(e.target.value)}
        />
      </WidthConstraint>
      <NovelEditor
        className="w-screen mt-10 max-w-[1100px] mx-auto"
        defaultValue={contentJSON}
        disableLocalStorage
        onUpdate={(e) => {
          setContentJSON(e?.getJSON() ?? {});
          setContentHTML(e?.getHTML() ?? "");
        }}
        onDebouncedUpdate={async () => {
          setSaveStatus("Saving...");
          await onSave();
          setSaveStatus("Saved");
        }}
      />
    </div>
  );
}
