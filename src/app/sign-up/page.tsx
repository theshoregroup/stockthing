import { SignUp } from "@clerk/nextjs/app-beta";

export default function Page() {
  return (
    <div className="grid h-screen w-screen place-items-center">
      <SignUp signInUrl="/sign-in" redirectUrl={"/portal/register"} />
    </div>
  );
}
