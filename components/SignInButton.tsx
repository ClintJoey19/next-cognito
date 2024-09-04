"use client";
import { signIn, signInWithRedirect } from "aws-amplify/auth";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

const SignInButton = () => {
  const router = useRouter();

  const handleSignIn = async () => {
    try {
      await signInWithRedirect({ provider: "Google" });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Button variant="outline" onClick={handleSignIn}>
      Sign In With Google
    </Button>
  );
};

export default SignInButton;
