import BlogCard from "@/components/cards/BlogCard";
import Header from "@/components/Header";
import Loader from "@/components/ui/Loader";
import Meta from "@/components/Meta";
import AuthLayout from "@/layouts/authLayout";
import { IBlog } from "@/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ROUTES } from "@/routes";
import NoContent from "@/components/NoContent";
import { Plus } from "lucide-react";
import Footer from "@/components/footers/Footer";

export default function Dashboard(): JSX.Element {
  const { isLoading, isError, error, data } = useQuery(["fetch user blogs"], async () => {
    const blog = await axios.get("/api/blog/fetch-all");
    return (blog.data.data as IBlog[]) ?? [];
  });

  return (
    <>
      <Meta title="pingu - My blogs" />
      <AuthLayout>
        <Header title="My blogs" />
        <div className="dotted-bg pt-[140px] md:pt-[80px]">
          {isError && !isLoading && <p>An error occured loading your blogs</p>}
          {isLoading && !isError ? (
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
                <NoContent
                  page={ROUTES.new}
                  label="You don't have any publications yet!"
                  buttonIcon={<Plus size={18} />}
                  buttonLabel="Create new publication"
                />
              )}
            </>
          )}
        </div>
      </AuthLayout>
      <Footer />
    </>
  );
}
