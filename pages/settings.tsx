import Header from "@/components/Header";
import AuthLayout from "@/layouts/authLayout";
export default function Settings(): JSX.Element {
  return (
    <AuthLayout>
      <div className="dotted-bg">
        <Header />
      </div>
    </AuthLayout>
  );
}
