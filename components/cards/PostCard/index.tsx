import { motion } from "framer-motion";
import Link from "next/link";
import { ROUTES } from "@/routes";
import Image from "next/image";
import { IPost } from "@/types";
import { useParams } from "next/navigation";
import { Badge } from "../../ui/Badge";

export default function PostCard(props: {
  index: number;
  data: IPost;
  page?: string;
}): JSX.Element {
  const params = useParams();
  return (
    <motion.li
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: props.index / 10 }}
      className="group"
    >
      <Link href={props.page ?? `${ROUTES.write}/${params.id}/${props.data.id}`}>
        <div className="border rounded-2xl bg-white hover:shadow-none shadow-md hover:scale-[1.03] transition-all hover:bg-transparent">
          <div className="flex-1 relative">
            <Badge className="w-max m-3 absolute top-0 left-0">published 🎉</Badge>
            <Image
              src={props.data.banner ?? "/assets/blob.webp"}
              className="bg-gray-100 object-cover h-[200px] w-full rounded-t-2xl"
              width={200}
              height={200}
              alt="..."
            />
          </div>
          <div className="flex-1 flex flex-col justify-center space-y-2 p-5">
            <h3 className="text-xl text-black group-hover:text-primary">
              {props.data.title}
            </h3>
          </div>
        </div>
      </Link>
    </motion.li>
  );
}
