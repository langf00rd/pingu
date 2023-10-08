import BlogCard from "@/components/cards/BlogCard";
import CreateSiteDialog from "@/components/CreateSiteDialog";
import Header from "@/components/Header";
import Loader from "@/components/ui/Loader";
import Meta from "@/components/Meta";
import { Button } from "@/components/ui/Button";
import AuthLayout from "@/layouts/authLayout";
import { IBlog } from "@/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function Dashboard(): JSX.Element {
  const { isLoading, isError, data } = useQuery(["fetch user blogs"], async () => {
    const blog = await axios.get("/api/blog/fetch-all");
    return (blog.data.data as IBlog[]) ?? [];
  });

  console.log(data);

  return (
    <AuthLayout>
      <Meta title="pingu - My blogs" />
      <div className="dotted-bg">
        <Header title="My blogs" />
        {isError && <p>An error occured loading your blogs</p>}
        {isLoading ? (
          <Loader />
        ) : (
          <>
            {data && data.length > 0 ? (
              <ul className="grid md:grid-cols-2 grid-cols-1 gap-5 p-5 max-w-4xl mx-auto">
                {data.map((blog: IBlog, index: number) => (
                  <BlogCard key={index} data={blog} />
                ))}
              </ul>
            ) : (
              <div className="flex items-center justify-center flex-col h-[300px] gap-3">
                <p className="text-2xl">
                  It&apos;s quiet here. You seem to have no blogs
                </p>
                <CreateSiteDialog>
                  <Button variant="outline">Create a blog</Button>
                </CreateSiteDialog>
              </div>
            )}
          </>
        )}
      </div>
    </AuthLayout>
  );
}
