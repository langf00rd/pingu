import { PaintBucketIcon, Globe, Workflow, Code } from "lucide-react";

export const BLOG_SETTINGS_TABS = [
  {
    label: "Theme",
    icon: <PaintBucketIcon size={18} />,
  },
  { label: "Domains", icon: <Globe size={18} /> },
  { label: "Integration", icon: <Workflow size={18} /> },
  { label: "Developer", icon: <Code size={18} /> },
];

export const BLOG_THEMES: { name: string; image: string; isPremium?: boolean }[] = [
  {
    name: "Astral",
    image: "/assets/themes/1.png",
    isPremium: true,
  },
  {
    name: "Demo",
    image: "/assets/themes/2.png",
  },
  {
    name: "Super",
    image: "/assets/themes/3.png",
    isPremium: true,
  },
];
