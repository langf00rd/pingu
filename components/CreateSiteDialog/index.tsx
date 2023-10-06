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
import { Linkedin, Twitter } from "lucide-react";
import Link from "next/link";
import * as suuid from "short-uuid";
import { ROUTES } from "@/routes";
import { IBlog } from "@/types";
import { generate12ByteID } from "@/lib/utils";

interface Values {
  name: string;
  sub_domain: string;
}

const uid = suuid.generate();

export default function CreateSiteDialog(props: { children?: ReactNode }): JSX.Element {
  const { width, height } = useWindow();
  const [loading, setLoading] = useState(false);
  const [isBlogCreated, setIsBlogCreated] = useState(false);

  async function onSubmitForm(values: Values) {
    const body = { ...values } as IBlog;
    body.id = generate12ByteID();
    body.created_at = new Date().toISOString();
    body.meta = {
      title: values.name,
      image: "random-image-here",
    };

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
        toast.error(error.response.data.error ?? error.message);
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
              // validationSchema={toFormikValidationSchema(blogSchema)}
              onSubmit={(values: Values) => onSubmitForm(values)}
              initialValues={{
                name: "",
                sub_domain: "",
              }}
            >
              {({ touched, errors }) => (
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
                  {/* <div className="space-y-1">
                    <Label htmlFor="title">Blog photo</Label>
                    <DropZone
                      onUploadedFile={async () => console.log("hi mom!")}
                      fieldName={""}
                      value={""}
                    />
                  </div> */}
                  <DialogFooter>
                    <Button disabled={loading} type="submit">
                      {loading ? "loading..." : "Create blog"}
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
                <Link href={`${ROUTES.blog}/${uid}`}>
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
