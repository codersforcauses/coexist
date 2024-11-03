import { Pen } from "lucide-react";
import { useState } from "react";

import EditProfileModal from "@/components/main/EditProfileModal";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import useUser from "@/hooks/useUser";

function EventCount({ title, count }: { title: string; count: number }) {
  return (
    <div className="flex flex-col items-center gap-2 md:gap-5">
      <p className="text-accent">{title}</p>
      <p className="text-5xl">{count}</p>
    </div>
  );
}
function CityStatus({
  title,
  value,
}: {
  title: string | undefined;
  value: string | undefined;
}) {
  return (
    <>
      <p className="font-medium">{title}</p>
      <p className="font-medium text-accent">{value}</p>
    </>
  );
}

export default function Settings() {
  const [isOpen, setIsOpen] = useState(false);
  const { logout } = useAuth();

  const user_query = useUser();

  const user = user_query.data;
  const placeholderImageURL =
    "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png";

  return (
    <div className="flex flex-1 flex-col items-center gap-4 px-2 py-4 md:px-6 lg:px-16">
      <EditProfileModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
      <h1 className="text-left text-2xl font-semibold md:text-3xl">
        My Profile
      </h1>
      <div className="flex flex-1 flex-col items-center justify-between gap-5 rounded-[20px] border-[5px] border-accent bg-card px-4 py-6 md:justify-start md:gap-14 md:pt-10 lg:items-center lg:px-10">
        <div className="flex flex-col items-center gap-4 lg:flex-row lg:gap-10">
          <Avatar className="h-44 w-44 md:h-64 md:w-64">
            <AvatarImage src={placeholderImageURL} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="flex flex-col items-center justify-center lg:items-start lg:gap-2">
            <div className="flex items-center gap-2 text-4xl font-semibold md:text-5xl lg:gap-4">
              <p>
                {" "}
                {user?.first_name} {user?.last_name}
              </p>
              <button onClick={() => setIsOpen(true)}>
                <Pen className="h-7 w-7 text-accent" />
              </button>
            </div>
            <p className="md:text-2xl">{user?.email}</p>
            <div className="mt-5 grid grid-cols-2 gap-x-7 gap-y-2 text-xl md:mt-7 md:text-2xl">
              <CityStatus title="Main City" value={user?.branch} />
              <CityStatus title="Status" value={user?.role} />
            </div>
          </div>
        </div>

        <div className="flex justify-between gap-4 text-[1.7rem] md:gap-8 md:text-4xl lg:self-center">
          <EventCount title={"Attended"} count={0} />
          <hr className="h-28 w-[1px] rounded-lg bg-gray-600" />
          <EventCount title={"Organised"} count={0} />
        </div>
        <Button
          size={"lg"}
          variant={"outline"}
          className="border-accent text-2xl text-accent lg:self-center"
          onClick={() => {
            logout();
          }}
        >
          Sign Out
        </Button>
      </div>
    </div>
  );
}
