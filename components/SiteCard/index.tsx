import Link from "next/link";
import { Badge } from "../ui/Badge";
import { BarChart, Globe, Link2 } from "lucide-react";
import { ROUTES } from "@/routes";
import Image from "next/image";

export default function SiteCard(props: { title: string }): JSX.Element {
  return (
    <li className="group">
      <Link
        href={`${ROUTES.site}/${Date.now()}`}
        className="bg-white p-5 rounded-2xl space-y-10 border group-hover:shadow-none shadow-md hover:scale-[1.03] transition-all block hover:bg-transparent peer"
      >
        <div className="flex items-center space-x-3">
          <Image
            src="/assets/test-3.png"
            alt=""
            className="w-[50px] h-[50px] rounded-full"
            width={50}
            height={50}
          />
          <div>
            <p className="md:text-md text-black group-hover:text-primary">
              {props.title}
            </p>
            <small>james.pingu.sh</small>
          </div>
        </div>
        <ul className="flex items-center justify-between group-hover:text-primary">
          <li className="flex items-center space-x-1 text-sm">
            <Globe size={17} />
            <p>1 domain</p>
          </li>
          <li className="flex items-center space-x-1 text-sm">
            <BarChart size={17} />
            <p>200 clicks</p>
          </li>
        </ul>
      </Link>
    </li>
  );
}
