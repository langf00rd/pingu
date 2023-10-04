import Header from "@/components/Header";
import { Drafts } from "@/components/tabs/Drafts";
import { Button } from "@/components/ui/Button";
import { useState } from "react";
import { SiteSettings } from "@/components/tabs/SiteSettings";
import Footer from "@/components/Footer";

const TABS = ["Drafts", "Site settings"];

export default function Site(): JSX.Element {
  const [selectedTab, setSelectedTab] = useState(TABS[0]);

  function tabViews(): JSX.Element {
    switch (selectedTab) {
      case TABS[0]:
        return <Drafts />;
      case TABS[1]:
        return <SiteSettings />;
      default:
        return <></>;
    }
  }

  return (
    <div className="dotted-bg">
      <Header>
        <ul className="flex items-center justify-center relative z-10">
          {TABS.map((tab) => (
            <li key={tab}>
              <Button
                onClick={() => setSelectedTab(tab)}
                variant="ghost"
                size="md"
                className={`w-[120px] h-[70px] border-transparent border-b-2 rounded-none ${
                  selectedTab === tab && "border-primary text-primary"
                }`}
              >
                <p className="text-center">{tab}</p>
              </Button>
            </li>
          ))}
        </ul>
      </Header>
      {tabViews()}
      <Footer />
    </div>
  );
}
