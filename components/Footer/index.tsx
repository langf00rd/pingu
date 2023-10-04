export default function Footer(): JSX.Element {
  return (
    <footer className="border-t text-center text-sm py-3 mt-10">
      <p>&copy; {new Date().getFullYear()} Pingu Labs</p>
    </footer>
  );
}
