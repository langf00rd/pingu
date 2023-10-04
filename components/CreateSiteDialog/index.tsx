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

export default function CreateSiteDialog(): JSX.Element {
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
          onSubmit={(values) => console.log(values)}
          initialValues={{
            title: "",
            subdomain: "",
          }}
        >
          <Form className="space-y-5">
            <div className="space-y-1">
              <Label htmlFor="title">Blog title</Label>
              <Field
                id="title"
                name="title"
                placeholder="My personal blog"
                className="w-full outline-none bg-gray-50 p-2 rounded-md border"
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
              <div className="w-full outline-none bg-gray-50 p-2 rounded-md border flex items-center">
                <Field
                  id="subdomain"
                  className="w-full bg-transparent outline-none text-primary"
                  name="subdomain"
                  placeholder="john"
                />
                <p>.pingu.sh</p>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </Form>
        </Formik>
      </DialogContent>
    </Dialog>
  );
}
