import BlogPostCard from "@/components/BlogPostCard";
import { DashboardWidthConstraint } from "@/layouts/widthConstraint";

const SITES: { title: string; image: string }[] = [
  {
    image: "/assets/test.avif",
    title: "NFT Metadata Upload DApp With React & Thirdweb Storage",
  },
  {
    image: "/assets/test-2.avif",
    title: "How Blogging Can Boost Your Career as a Developer",
  },
];

export function Drafts(): JSX.Element {
  return (
    <DashboardWidthConstraint>
      <ul className="grid gap-5">
        {SITES.map((i, index) => (
          <BlogPostCard
            title={i.title as string}
            image={i.image}
            index={index}
            key={index}
          />
        ))}
      </ul>
    </DashboardWidthConstraint>
  );
}
