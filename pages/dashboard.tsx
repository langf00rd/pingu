import Header from "@/components/Header";
import SiteCard from "@/components/SiteCard";

export default function Dashboard(): JSX.Element {
  return (
    <div className="dotted-bg">
      <Header title="My sites" />
      <div>
        <ul className="grid md:grid-cols-2 grid-cols-1 gap-5 p-5 max-w-4xl mx-auto">
          {["", "", "", ""].map((i) => (
            <SiteCard key={i} />
          ))}
        </ul>
      </div>
    </div>
  );
}
