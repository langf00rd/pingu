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
import DropZone from "../DropZone";
import axios from "axios";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { blogSchema } from "@/lib/schema";
import { toast } from "sonner";
import { ReactNode, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { DialogDescription } from "@radix-ui/react-dialog";
import useWindow from "@/hooks/useWindow";
import Confetti from "react-confetti";
import { Linkedin, Twitter } from "lucide-react";
import Link from "next/link";
import * as suuid from "short-uuid";
import { ROUTES } from "@/routes";

interface Values {
  title: string;
  subdomain: string;
  uid: string;
  owner: string;
}

const uid = suuid.generate();

export default function CreateSiteDialog(props: { children?: ReactNode }): JSX.Element {
  const { width, height } = useWindow();
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const [isBlogCreated, setIsBlogCreated] = useState(false);

  async function onSubmitForm(values: Values) {
    if (!user) return;
    setLoading(true);
    await axios
      .post("/api/blog/create", values)
      .then((res) => {
        toast.success(res.data.message);
        setIsBlogCreated(true);
      })
      .catch((error) => {
        toast.error(error.response.data.error ?? error.message);
      });
    setLoading(false);
  }

  return (
    <>
      {isBlogCreated && <Confetti width={width} height={height} />}
      <Dialog onOpenChange={() => setIsBlogCreated(false)}>
        <DialogTrigger asChild>
          {props?.children ?? <Button>Create a blog</Button>}
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
              validationSchema={toFormikValidationSchema(blogSchema)}
              onSubmit={(values: Values) => onSubmitForm(values)}
              initialValues={{
                title: "",
                subdomain: "",
                uid: uid,
                owner: "random-user-id",
              }}
            >
              {({ touched, errors }) => (
                <Form className="space-y-5">
                  <div className="space-y-1">
                    <Label htmlFor="title">Give your blog a name</Label>
                    <Field
                      id="title"
                      name="title"
                      placeholder="My personal blog"
                      className={`w-full outline-none bg-gray-50 p-2 rounded-md border transition-colors ${
                        touched.title && errors.title && "border-red-300"
                      }`}
                    />
                  </div>
                  <div className="space-y-1">
                    <div className="mb-3 space-y-1">
                      <Label htmlFor="subdomain">Your subdomain</Label>
                      <small className="block">
                        You can always move your blog to a custom domain for free when you
                        are ready
                      </small>
                    </div>
                    <div
                      className={`w-full outline-none bg-gray-50 p-2 rounded-md border transition-colors flex items-center  ${
                        touched.subdomain && errors.subdomain && "border-red-300"
                      }`}
                    >
                      <Field
                        id="subdomain"
                        className="w-full bg-transparent outline-none text-primary"
                        name="subdomain"
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
                      Create blog
                    </Button>
                  </DialogFooter>
                </Form>
              )}
            </Formik>
          ) : (
            <>
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
              <DialogFooter>
                <Link href={`${ROUTES.site}/${uid}`}>
                  <Button className="w-max">Next</Button>
                </Link>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
