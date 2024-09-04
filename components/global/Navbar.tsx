import Image from "next/image";
import UserAvatar from "./UserAvatar";
import {
  getServerSession,
  getUser,
} from "@/lib/amplify-server/amplify-session";
import UserRoleButton from "./UserRoleButton";

const Navbar = async () => {
  const session = await getServerSession();
  const user = await getUser();

  const roles = session?.tokens?.accessToken.payload[
    "cognito:groups"
  ] as string[];

  return (
    <header className="w-full h-[8vh] border-b border-slate-300">
      <div className="w-full max-w[1220px] h-full mx-auto flex justify-between items-center px-4">
        <div>
          <Image src="./logo.svg" alt="logo" height={30} width={120} />
        </div>
        <div className="flex items-center gap-4">
          <UserRoleButton roles={roles} />
          <UserAvatar user={user} />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
