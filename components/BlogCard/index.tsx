import Link from "next/link";
import { BarChart, Globe, Link2 } from "lucide-react";
import { ROUTES } from "@/routes";
import Image from "next/image";
import { IBlog } from "@/types";

export default function BlogCard(props: { data: IBlog }): JSX.Element {
  return (
    <li className="group">
      <div className="bg-white p-5 rounded-2xl space-y-10 border group-hover:shadow-none shadow-md hover:scale-[1.03] transition-all block hover:bg-transparent peer relative">
        <div className="relative">
          <Link
            className="flex w-full space-x-3"
            href={`${ROUTES.blog}/${props.data.subdomain}/${props.data.uid}`}
          >
            <Image
              src="/assets/blob.webp"
              alt=""
              className="w-[50px] h-[50px] rounded-full"
              width={50}
              height={50}
            />
            <div>
              <p className="md:text-md text-black group-hover:text-primary">
                {props.data.title}
              </p>
              <small>{props.data.subdomain}.pingu.sh</small>
            </div>
          </Link>
        </div>
        <ul className="flex items-center justify-between">
          <li className="flex items-center space-x-1 text-sm">
            <Globe size={17} />
            <p>1 domain</p>
          </li>
          <li className="flex items-center space-x-1 text-sm">
            <BarChart size={17} />
            <p>200 clicks</p>
          </li>
          <li>
            <Link
              href={`${window.location.origin}/${props.data.subdomain}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center space-x-1 text-sm hover:text-primary transition-colors"
            >
              <Link2 size={17} />
              <p>Go to blog</p>
            </Link>
          </li>
        </ul>
      </div>
    </li>
  );
}
