import {
  PaintBucketIcon,
  Globe,
  Workflow,
  Code,
  Library,
  Settings2,
  TrendingUp,
  BookOpenIcon,
  Folder,
  Settings,
} from "lucide-react";

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

export const PUB_TABS: { label: string; icon: JSX.Element }[] = [
  { label: "Posts", icon: <Library size={17} /> },
  { label: "Analytics", icon: <TrendingUp size={17} /> },
  { label: "Settings", icon: <Settings2 size={17} /> },
];

export const MAIN_ASIDE_NAV_LINKS = [
  { label: "My Publications", page: "/dashboard", icon: <Folder /> },
  { label: "Settings", page: "/settings", icon: <Settings /> },
  { label: "Docs", page: "/documentation", icon: <BookOpenIcon /> },
];
