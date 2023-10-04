import Header from "@/components/Header";
import { Editor } from "novel";

export default function Write() {
  return (
    <div className="dotted-bg">
      <Header />
      <Editor className="w-screen mt-10 max-w-[1100px] mx-auto" />
    </div>
  );
}
