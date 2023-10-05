import { motion } from "framer-motion";
import Link from "next/link";
import { ROUTES } from "@/routes";
import { Badge } from "../ui/Badge";
import Image from "next/image";

export default function BlogPostCard(props: {
  index: number;
  title: string;
  image: string;
}): JSX.Element {
  return (
    <motion.li
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: props.index / 10 }}
      className="group"
    >
      <Link href={`${ROUTES.write}/${Date.now()}`}>
        <div className="flex flex-col md:flex-row border rounded-2xl bg-white hover:shadow-none shadow-md hover:scale-[1.03] transition-all hover:bg-transparent">
          <div className="flex-1 relative">
            <Badge className="w-max m-3 absolute top-0 left-0">published 🎉</Badge>
            <Image
              src={props.image}
              className="bg-gray-100 object-cover h-[200px] w-full rounded-t-2xl md:rounded-l-2xl"
              width={200}
              height={200}
              alt="..."
            />
          </div>
          <div className="flex-1 flex flex-col justify-center space-y-2 p-5">
            <h3 className="text-xl text-black group-hover:text-primary">{props.title}</h3>
            {/* <p>here is a sample text description</p> */}
          </div>
        </div>
      </Link>
    </motion.li>
  );
}
