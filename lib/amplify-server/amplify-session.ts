import { fetchAuthSession, fetchUserAttributes } from "aws-amplify/auth/server";
import { cookies } from "next/headers";
import { runWithAmplifyServerContext } from "./amplify-utils";

export const cache = {
  session: null,
  user: null,
};

export const getServerSession = async () => {
  try {
    const session = await runWithAmplifyServerContext({
      nextServerContext: { cookies },
      operation: async (contextSpec) => await fetchAuthSession(contextSpec),
    });

    if (!session) return null;

    return session;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getUser = async () => {
  try {
    const user = await runWithAmplifyServerContext({
      nextServerContext: { cookies },
      operation: async (contextSpec) => await fetchUserAttributes(contextSpec),
    });

    if (!user) return null;

    return user;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getCacheSession = async () => {
  try {
    const session = !cache.session ? await getServerSession() : cache.session;

    return session;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getCacheUser = async () => {
  try {
    const user = !cache.user ? await getUser() : cache.user;

    return user;
  } catch (error) {
    console.error(error);
    return null;
  }
};
