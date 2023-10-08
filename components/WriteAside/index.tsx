import { AnimatePresence, motion } from "framer-motion";
import { ChevronsLeft } from "lucide-react";
import { Button } from "../ui/Button";
import { useStore } from "@/config/store";
import { useState } from "react";
import { Field, Form, Formik } from "formik";
import { Label } from "../ui/Label";
import axios from "axios";
import { toast } from "sonner";
import { FormPost, IPost } from "@/types";
import { useParams } from "next/navigation";

export default function WriteAside(props: {
  show?: boolean;
  data: FormPost;
  contentHTML: any;
  contentJSON: any;
  subtitle: string;
  title: string;
}): JSX.Element {
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const showWriteAside = useStore((state) => state.showWriteAside);
  const setShowWriteAside = useStore((state) => state.setShowWriteAside);

  async function onSubmitForm(values: FormPost) {
    setLoading(true);
    const data: IPost = {
      meta: {
        title: values.meta.title,
        description: values.meta.description,
        image: values.meta.image,
      },
      title: props.title,
      sub_title: props.subtitle,
      tags: ["tag #1", "tag #2"],
      id: params["id"].toString(),
      parent_id: params["blog-id"].toString(),
      slug: props.title
        .replace(/[^a-zA-Z0-9]/g, "-")
        .toLowerCase()
        .trim(),
      author: "random-id",
      content_html: props.contentHTML,
      content_json: props.contentJSON,
      sub_domain: params.domain.toString(),
      show_stats: values.show_stats,
      show_toc: values.show_toc,
      is_published: true,
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
    setLoading(false);
  }

  return (
    <AnimatePresence>
      {showWriteAside && (
        <motion.aside
          initial={{ x: -300 }}
          animate={{ x: 0 }}
          exit={{ x: -500 }}
          transition={{ type: "just" }}
          className="md:w-[500px] fixed top-0 left-0 h-screen flex flex-col justify-between bg-white border-r shadow-xl p-5 overflow-y-scroll z-[60]"
        >
          <div className="space-y-10">
            <div className="flex items-center justify-between">
              <h2 className="text-xl">Ready to publish?</h2>
              <Button
                variant="ghost"
                onClick={() => setShowWriteAside(!showWriteAside)}
                className="hover:text-primary"
              >
                <ChevronsLeft size={23} />
              </Button>
            </div>
            <Formik
              onSubmit={(values: FormPost) => onSubmitForm(values)}
              initialValues={{
                show_stats: props.data?.show_stats,
                show_toc: props.data?.show_toc,
                meta: {
                  title: props.data?.meta.title ?? "",
                  description: props.data?.meta.description ?? "",
                  image: props.data?.meta.image ?? "https://img.link",
                },
              }}
            >
              {({}) => (
                <Form className="space-y-10">
                  <div>
                    <p className="text-sm text-primary">
                      {window.location.host}/{params.domain}/
                      {props.title
                        .replace(/[^a-zA-Z0-9]/g, "-")
                        .toLowerCase()
                        .trim()}
                    </p>
                  </div>
                  <div className="flex items-center justify-between space-x-3 w-full">
                    <Label className="gap-2 flex items-center text-black">
                      <Field
                        type="checkbox"
                        className="w-[16px] h-[16px]"
                        name="show_stats"
                      />
                      Show stats
                    </Label>
                  </div>
                  <div className="flex items-center justify-between space-x-3 w-full">
                    <Label className="gap-2 flex items-center text-black">
                      <Field
                        type="checkbox"
                        className="w-[16px] h-[16px]"
                        name="show_toc"
                      />
                      Show table of contents
                    </Label>
                  </div>
                  <div>
                    <Label htmlFor="meta-title" className="text-black">
                      SEO title (optional)
                    </Label>
                    <div className="space-y-4 mt-2">
                      <p className="text-sm">
                        This will appear in place of your post title on search engine
                        results
                      </p>
                      <Field
                        className="border shadow-sm w-full p-1 px-2 rounded-md outline-none"
                        name="meta.title"
                        id="meta-title"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="meta-description" className="text-black">
                      SEO description (optional)
                    </Label>
                    <div className="space-y-4 mt-2">
                      <p className="text-sm">
                        This will be shown in place of your subtitle on search engine
                        results pages. Ideally, summarize the article and keep it between
                        140 and 156 characters in length.
                      </p>
                      <Field
                        as="textarea"
                        className="border shadow-sm w-full p-1 px-2 rounded-md outline-none"
                        name="meta.description"
                        id="meta-description"
                      />
                    </div>
                  </div>
                  <Button disabled={loading} className="w-full">
                    {loading ? "loading" : "Update & publish"}
                  </Button>
                </Form>
              )}
            </Formik>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
