import { getUser } from "@/lib/amplify-server/amplify-session";
import Image from "next/image";
import React from "react";

const page = async () => {
  const user = await getUser();

  return (
    <div>
      <h1>User Page</h1>
      <p>Name: {user?.name}</p>
      <p>Email: {user?.email}</p>
      <Image
        src={user?.picture || ""}
        alt="profile picture"
        width={50}
        height={50}
        className="object-cover object-center rounded-full"
      />
    </div>
  );
};

export default page;
