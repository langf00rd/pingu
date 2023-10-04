import BlogPostCard from "@/components/BlogPostCard";
import { DashboardWidthConstraint } from "@/layouts/widthConstraint";

export function Drafts(): JSX.Element {
  return (
    <DashboardWidthConstraint>
      <ul className="grid gap-5">
        {["", "", "", "", "", "", "", ""].map((i, index) => (
          <BlogPostCard index={index} key={i} />
        ))}
      </ul>
    </DashboardWidthConstraint>
  );
}
