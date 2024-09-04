"use client";
import { Amplify } from "aws-amplify";
import config from "@/src/amplifyconfiguration.json";

Amplify.configure(config, { ssr: true });

const AmplifyProvider = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default AmplifyProvider;
