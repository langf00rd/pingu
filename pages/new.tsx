import CreateSiteDialog from "@/components/CreateSiteDialog";
import DropZone from "@/components/DropZone";
import { Label } from "@/components/ui/Label";
import useWindow from "@/hooks/useWindow";
import { blogSchema } from "@/lib/schema";
import { generate12ByteID } from "@/lib/utils";
import { IBlog } from "@/types";
import axios from "axios";
import { Field, Form, Formik } from "formik";
import { useState } from "react";
import { toast } from "sonner";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { z } from "zod";
import WidthConstraint from "@/layouts/widthConstraint";
import { Button } from "@/components/ui/Button";
import { BlogCreateSuccessView } from "@/components/BlogCreateSuccess";
import Link from "next/link";
import { ArrowRight, Linkedin, Twitter } from "lucide-react";
import Confetti from "react-confetti";
import { ROUTES } from "@/routes";
import { motion } from "framer-motion";

const id = generate12ByteID();
type Blog_ = z.infer<typeof blogSchema_>;

// a copy of `blogSchema` with only reqquired fields for form validation
const blogSchema_ = z.object({
  name: blogSchema.shape.name,
  id: blogSchema.shape.id,
  sub_domain: blogSchema.shape.sub_domain,
  created_at: blogSchema.shape.created_at,
  description: blogSchema.shape.description,
  banner: blogSchema.shape.banner,
});

export default function New(): JSX.Element {
  const { width, height } = useWindow();
  const [loading, setLoading] = useState(false);
  const [isBlogCreated, setIsBlogCreated] = useState(false);
  const [subDomain, setSubDomain] = useState("");

  async function onSubmitForm(values: Blog_) {
    const body = { ...values } as IBlog;
    setSubDomain(values.sub_domain);
    console.log(body);
    setLoading(true);
    await axios
      .post("/api/blog/create", body)
      .then((res) => {
        console.log(res);
        toast.success(res.data.message);
        setIsBlogCreated(true);
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.message);
        // toast.error(error.response.data.error ?? error.message);
      });
    setLoading(false);
  }

  return (
    <>
      {isBlogCreated && <Confetti width={width} height={height} />}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="dotted-bg flex items-center justify-center px-5"
      >
        <WidthConstraint className="md:p-10 p-0 max-w-[700px] space-y-5 md:shadow-xl md:bg-white md:border md:rounded-3xl">
          <h2 className="text-3xl">
            {isBlogCreated ? "You are all set! 🎉" : "Create a blog"}
          </h2>
          {!isBlogCreated ? (
            <Formik
              validateOnChange
              validationSchema={toFormikValidationSchema(blogSchema_)}
              onSubmit={(values: Blog_) => onSubmitForm(values)}
              initialValues={{
                id,
                name: "",
                sub_domain: "",
                description: "",
                created_at: new Date().toISOString(),
                banner:
                  "https://res.cloudinary.com/follio/image/upload/v1696762121/bfnmtin2bi95h6ty5qxi.png",
              }}
            >
              {({ touched, errors, values }) => (
                <Form className="space-y-5">
                  <div className="space-y-1">
                    <Label className="text-[16px]" htmlFor="name">
                      Give your blog a name
                    </Label>
                    <Field
                      id="name"
                      name="name"
                      placeholder="My personal blog"
                      className={`w-full outline-none bg-gray-50 p-2 rounded-md border transition-colors ${
                        touched.name && errors.name && "border-red-300"
                      }`}
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-[16px]" htmlFor="name">
                      Describe your blog
                    </Label>
                    <Field
                      as="textarea"
                      id="description"
                      name="description"
                      className={`w-full outline-none bg-gray-50 p-2 rounded-md border transition-colors ${
                        touched.description && errors.description && "border-red-300"
                      }`}
                    />
                  </div>
                  <div className="space-y-1">
                    <div className="space-y-1 mb-3">
                      <Label className="text-[16px]" htmlFor="sub_domain">
                        Your sub domain
                      </Label>
                      <small className="block">
                        You can always move your blog to a custom domain for free when you
                        are ready
                      </small>
                    </div>
                    <div
                      className={` w-full outline-none bg-gray-50 p-2 rounded-md border transition-colors flex items-center  ${
                        touched.sub_domain && errors.sub_domain && "border-red-300"
                      }`}
                    >
                      <Field
                        id="sub_domain"
                        className="w-full bg-transparent outline-none text-primary text-right"
                        name="sub_domain"
                        placeholder="john"
                      />
                      <p>.pingu.sh</p>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-[16px]" htmlFor="title">
                      Blog banner image
                    </Label>
                    <DropZone
                      onUploadedFile={async () => console.log("hi mom!")}
                      fieldName={""}
                      value={""}
                    />
                  </div>
                  <div className="flex space-x-3 justify-end">
                    <Button variant="outline" onClick={() => window.history.back()}>
                      Cancel
                    </Button>
                    <Button disabled={loading} type="submit">
                      {loading ? "loading..." : "Create blog"}
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          ) : (
            <main className="space-y-3">
              <p className="text-xl">
                Congrats! You&apos;ve successfully created a blog. Tell the world!
              </p>
              <div className="flex items-center justify-between">
                <ul className="flex items-center space-x-5">
                  <li>
                    <Link href="/">
                      <Twitter fill="#26a7de" strokeWidth={0} />
                    </Link>
                  </li>
                  <li>
                    <Link href="/">
                      <Linkedin fill="#0072b1" strokeWidth={0} />
                    </Link>
                  </li>
                </ul>
                <div>
                  <Link href={`${ROUTES.blog}/${subDomain}/${id}`}>
                    <Button className="w-max gap-2">
                      Go to blog
                      <ArrowRight size={18} />
                    </Button>
                  </Link>
                </div>
              </div>
            </main>
          )}
        </WidthConstraint>
      </motion.div>
    </>
  );
}
