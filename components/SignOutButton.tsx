"use client";
import { signOut } from "aws-amplify/auth";
import React from "react";

const SignOutButton = () => {
  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error(error);
    }
  };
  return <button onClick={handleSignOut}>Sign Out</button>;
};

export default SignOutButton;
