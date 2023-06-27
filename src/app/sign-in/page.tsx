import { SignIn } from "@clerk/nextjs/app-beta";

export default function Page() {
  return (
    <div className="grid h-screen w-screen place-items-center">
      <SignIn signUpUrl="/sign-up" redirectUrl={"/portal"} />
    </div>
  );
}
