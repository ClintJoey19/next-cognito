import SignInButton from "@/components/SignInButton";
import { getServerSession } from "@/lib/amplify-server/amplify-session";
import { redirect } from "next/navigation";
import React from "react";

const page = () => {
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center gap-4">
      <SignInButton />
    </div>
  );
};

export default page;
