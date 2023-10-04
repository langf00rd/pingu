import { motion } from "framer-motion";
import { DashboardWidthConstraint } from "@/layouts/widthConstraint";
import { useState } from "react";
import { Drafts } from "../Drafts";
import Image from "next/image";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/Badge";
import { Globe, PaintBucketIcon, Workflow } from "lucide-react";

const TABS = [
  {
    label: "Theme",
    icon: <PaintBucketIcon size={18} />,
  },
  { label: "Domains", icon: <Globe size={18} /> },
  { label: "Integration", icon: <Workflow size={18} /> },
];
const THEMES: { name: string; image: string; isPremium?: boolean }[] = [
  {
    name: "Astral",
    image: "/",
    isPremium: true,
  },
  {
    name: "Demo",
    image: "/",
  },
  {
    name: "Super",
    image: "/",
    isPremium: true,
  },
  {
    name: "Dynamo",
    image: "/",
  },
  {
    name: "Prestige",
    image: "/",
  },
];

export default function Themes(): JSX.Element {
  const [selectedTheme, setSelectedTheme] = useState(THEMES[0].name);
  return (
    <ul className="grid grid-cols-2 gap-5">
      {THEMES.map((theme, index) => (
        <motion.li
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: index / 10 }}
          key={index}
          className={`border-2 shadow-md rounded-2xl bg-white transition-colors cursor-pointer ${
            selectedTheme === theme.name
              ? "border-primary/30 shadow-none text-primary"
              : "border-transparent"
          }`}
          onClick={() => setSelectedTheme(theme.name)}
        >
          <Image
            src="/assets/test-3.png"
            className="bg-gray-100 object-cover h-[200px] w-full rounded-t-2xl"
            width={200}
            height={300}
            alt="..."
          />
          <div className="p-3 flex items-center justify-between">
            <p>{theme.name}</p>
            {!theme.isPremium && <Badge>Premium</Badge>}
          </div>
        </motion.li>
      ))}
    </ul>
  );
}

export function SiteSettings(): JSX.Element {
  const [selectedTab, setSelectedTab] = useState(TABS[0]);
  function tabViews(): JSX.Element {
    switch (selectedTab) {
      case TABS[0]:
        return <Themes />;
      default:
        return <p>:eyes:</p>;
    }
  }

  return (
    <DashboardWidthConstraint>
      <div className="flex items-start md:flex-row flex-col md:space-x-10">
        <ul className="md:grid flex gap-5 flex-1 md:sticky md:top-[100px] w-full mb-5">
          {TABS.map((tab, index) => (
            <li
              key={index}
              onClick={() => setSelectedTab(tab)}
              className={`cursor-pointer hover:text-primary transition-colors flex space-x-1 ${
                selectedTab === tab && "text-primary"
              }`}
            >
              <div className="mt-[1px]">{tab.icon}</div>
              <p className="whitespace-nowrap">{tab.label}</p>
            </li>
          ))}
        </ul>
        <div className="flex-[5] w-full">{tabViews()}</div>
      </div>
    </DashboardWidthConstraint>
  );
}
