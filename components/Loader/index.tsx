import Image from "next/image";

export default function Loader(): JSX.Element {
  return (
    <div className="w-full flex items-center justify-center h-[300px]">
      <Image
        width="23"
        height="23"
        src="/assets/logo.png"
        className="loader"
        alt="pingu logo"
      />
      {/* <span className="loader invert"></span> */}
    </div>
  );
}
