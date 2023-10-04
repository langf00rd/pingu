import Header from "@/components/Header";
import SiteCard from "@/components/SiteCard";

export default function Dashboard(): JSX.Element {
  return (
    <div className="dotted-bg">
      <Header title="My blogs" />
      <div>
        <ul className="grid md:grid-cols-2 grid-cols-1 gap-5 p-5 max-w-4xl mx-auto">
          {["Typescript blog", "Random blog site", "Acme's blog", "Hello world"].map(
            (i) => (
              <SiteCard title={i} key={i} />
            )
          )}
        </ul>
      </div>
    </div>
  );
}
