import { UserButton } from "@clerk/nextjs";

export default function Header({ title }: { title: string }) {
  return (
    <header className="flex justify-between p-5">
      <h1>{title}</h1>
      <UserButton afterSignOutUrl="/" />
    </header>
  );
}
