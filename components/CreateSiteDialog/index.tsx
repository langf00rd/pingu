import { Button } from "@/components/ui/Button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/Dialog";
import { Field, Form, Formik } from "formik";
import { Label } from "../ui/Label";
import axios from "axios";
import { toast } from "sonner";
import { ReactNode, useState } from "react";
import { DialogDescription } from "@radix-ui/react-dialog";
import useWindow from "@/hooks/useWindow";
import Confetti from "react-confetti";
import { generate12ByteID } from "@/lib/utils";
import { BlogCreateSuccessView } from "../BlogCreateSuccess";
import DropZone from "../DropZone";
import { blogSchema } from "@/lib/schema";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { z } from "zod";
import { IBlog } from "@/types";

type Blog_ = z.infer<typeof blogSchema_>;

// a copy of `blogSchema` with only reqquired fields for form validation
const blogSchema_ = z.object({
  name: blogSchema.shape.name,
  id: blogSchema.shape.id,
  sub_domain: blogSchema.shape.sub_domain,
  created_at: blogSchema.shape.created_at,
});

export default function CreateSiteDialog(props: { children?: ReactNode }): JSX.Element {
  const { width, height } = useWindow();
  const [loading, setLoading] = useState(false);
  const [isBlogCreated, setIsBlogCreated] = useState(false);

  async function onSubmitForm(values: Blog_) {
    const body = { ...values } as IBlog;
    body.meta = {
      title: values.name,
    };
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
      <Dialog onOpenChange={() => setIsBlogCreated(false)}>
        <DialogTrigger asChild>
          {props?.children ?? <Button className="w-full">Create a blog</Button>}
        </DialogTrigger>
        <DialogContent className="p-5 bg-white">
          <DialogHeader>
            <DialogTitle>
              {isBlogCreated ? "You are all set! 🎉" : "Create a blog"}
            </DialogTitle>
            {isBlogCreated && (
              <DialogDescription>
                Congrats! You&apos;ve successfully created a blog. Tell the world!
              </DialogDescription>
            )}
          </DialogHeader>
          {!isBlogCreated ? (
            <Formik
              validateOnChange
              validationSchema={toFormikValidationSchema(blogSchema_)}
              onSubmit={(values: Blog_) => onSubmitForm(values)}
              initialValues={{
                name: "",
                sub_domain: "",
                id: generate12ByteID(),
                created_at: new Date().toISOString(),
              }}
            >
              {({ touched, errors, values }) => (
                <Form className="space-y-5">
                  <div className="space-y-1">
                    <Label htmlFor="name">Give your blog a name</Label>
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
                    <div className="mb-3 space-y-1">
                      <Label htmlFor="sub_domain">Your sub_domain</Label>
                      <small className="block">
                        You can always move your blog to a custom domain for free when you
                        are ready
                      </small>
                    </div>
                    <div
                      className={`w-full outline-none bg-gray-50 p-2 rounded-md border transition-colors flex items-center  ${
                        touched.sub_domain && errors.sub_domain && "border-red-300"
                      }`}
                    >
                      <Field
                        id="sub_domain"
                        className="w-full bg-transparent outline-none text-primary"
                        name="sub_domain"
                        placeholder="john"
                      />
                      <p>.pingu.sh</p>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="title">Blog photo</Label>
                    <DropZone
                      onUploadedFile={async () => console.log("hi mom!")}
                      fieldName={""}
                      value={""}
                    />
                  </div>
                  <DialogFooter>
                    <Button disabled={loading} type="submit">
                      {loading ? "loading..." : "Create blog"}
                    </Button>
                  </DialogFooter>
                </Form>
              )}
            </Formik>
          ) : (
            <BlogCreateSuccessView uid="dddd" />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
