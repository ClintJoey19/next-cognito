import { Button } from "../ui/button";
import Link from "next/link";

const UserRoleButton = ({ roles }: { roles: string[] }) => {
  if (roles.length === 1) return null;

  return (
    <Button variant="ghost" asChild>
      <Link href={`/${roles[1]}`} className="capitalize">
        {roles[1]}
      </Link>
    </Button>
  );
};

export default UserRoleButton;
