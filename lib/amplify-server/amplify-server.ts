import { NextServer } from "@aws-amplify/adapter-nextjs";
import { runWithAmplifyServerContext } from "./amplify-utils";
import { fetchAuthSession } from "aws-amplify/auth/server";

export const authenticated = async (context: NextServer.Context) => {
  return await runWithAmplifyServerContext({
    nextServerContext: context,
    operation: async (contextSpec) => {
      try {
        const session = await fetchAuthSession(contextSpec);

        if (!session.tokens) return null;

        return session;
      } catch (error) {
        console.error(error);
        return null;
      }
    },
  });
};
