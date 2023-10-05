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
import { useState } from "react";
import { Blog } from "@/types";
import { useUser } from "@clerk/nextjs";

interface Values {
  title: string;
  subdomain: string;
}

export default function CreateSiteDialog(): JSX.Element {
  const { user } = useUser();
  const [loading, setLoading] = useState(false);

  async function onSubmitForm(values: Values) {
    if (!user) return;

    let data = { ...values } as Blog;
    data.owner = user.id;
    data.banner = "";
    data.theme_id = "";
    data.theme_color = "";

    setLoading(true);
    await axios
      .post("/api/blog/create", values)
      .then(() => toast.success("yipee!"))
      .catch((error) => console.log(error.message));
    setLoading(false);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Create a blog</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white">
        <DialogHeader>
          <DialogTitle>Create a blog</DialogTitle>
        </DialogHeader>
        <Formik
          validationSchema={toFormikValidationSchema(blogSchema)}
          validateOnChange
          onSubmit={(values: Values) => onSubmitForm(values)}
          initialValues={{
            title: "",
            subdomain: "",
            owner: "owner1234",
          }}
        >
          {({ touched, errors }) => (
            <Form className="space-y-5">
              <div className="space-y-1">
                <Label htmlFor="title">Blog title</Label>
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
                    You can always move your blog to a custom domain for free when you are
                    ready
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
                  Save changes
                </Button>
              </DialogFooter>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
}
