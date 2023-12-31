import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/Badge";
import { BLOG_THEMES, BLOG_SETTINGS_TABS } from "@/lib/constants/nav";
import WidthConstraint from "@/layouts/widthConstraint";
import Meta from "@/components/Meta";
import { useParams } from "next/navigation";

export default function Themes(): JSX.Element {
  const [selectedTheme, setSelectedTheme] = useState(BLOG_THEMES[0].name);
  return (
    <ul className="grid grid-cols-2 gap-5">
      {BLOG_THEMES.map((theme, index) => (
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
            src={theme.image}
            className="bg-gray-100 object-cover w-full rounded-t-2xl"
            width={200}
            height={500}
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

export function BlogSettings(): JSX.Element {
  const params = useParams();
  const [selectedTab, setSelectedTab] = useState(BLOG_SETTINGS_TABS[0]);

  function tabViews(): JSX.Element {
    switch (selectedTab) {
      case BLOG_SETTINGS_TABS[0]:
        return <Themes />;
      default:
        return <p>:eyes:</p>;
    }
  }

  return (
    <>
      <Meta title={`${params.domain.toString().replaceAll("-", " ")} - Settings`} />
      <WidthConstraint>
        <div className="flex items-start md:flex-row flex-col md:space-x-10 space-y-5">
          <ul className="md:grid flex justify-center gap-5 flex-1 md:sticky md:top-[100px] w-full bg-white md:border-none border-b overflow-x-scroll py-3 px-10">
            {BLOG_SETTINGS_TABS.map((tab, index) => (
              <li
                key={index}
                onClick={() => setSelectedTab(tab)}
                className={`cursor-pointer hover:text-primary transition-colors flex items-center space-x-1 md:first:ml-0 first:ml-10 ${
                  selectedTab === tab && "text-primary"
                }`}
              >
                <div className="mt-[1px]">{tab.icon}</div>
                <p className="whitespace-nowrap">{tab.label}</p>
              </li>
            ))}
          </ul>
          <div className="flex-[5] w-full px-5">{tabViews()}</div>
        </div>
      </WidthConstraint>
    </>
  );
}
