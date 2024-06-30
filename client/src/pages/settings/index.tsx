import { Pen } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

function EventCount({ title, count }: { title: string; count: number }) {
  return (
    <div className="flex flex-col items-center gap-2 md:gap-5">
      <p className="">{title}</p>
      <p className="text-5xl">{count}</p>
    </div>
  );
}
function CityStatus({ title, value }: { title: string; value: string }) {
  return (
    <>
      <p className="font-medium">{title}</p>
      <p className="font-medium text-lime-700">{value}</p>
    </>
  );
}

export default function Settings() {
  const user = {
    name: "John Doe",
    email: "johndoe@gmai.com",
    city: "Perth",
    status: "Poster",
    attended: 3,
    organised: 1,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png",
  };
  return (
    <div className="flex flex-1 flex-col items-center gap-4 bg-gray-200 px-2 py-4 lg:items-start">
      <h1 className="text-left text-2xl font-semibold md:text-4xl">
        My Profile
      </h1>
      <div className="flex w-full flex-grow justify-center rounded-lg bg-lime-700 p-5">
        <div className="flex flex-1 flex-col items-center justify-between gap-5 rounded-lg bg-white px-4 py-6 md:justify-start md:gap-10 lg:items-start lg:px-10">
          <div className="flex flex-col items-center gap-4 lg:flex-row lg:gap-10">
            <Avatar className="h-44 w-44 md:h-64 md:w-64">
              <AvatarImage src={user.image} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="flex flex-col items-center justify-center lg:items-start lg:gap-2">
              <div className="flex items-center gap-2 text-4xl font-semibold md:text-5xl lg:gap-4">
                <p> {user.name}</p>
                <button>
                  <Pen className="h-7 w-7 text-lime-500" />
                </button>
              </div>
              <p className="text-green-500 md:text-2xl">{user.email}</p>
              <div className="mt-5 grid grid-cols-2 gap-x-7 gap-y-2 text-xl md:mt-7 md:text-2xl">
                <CityStatus title="Main City" value={user.city} />
                <CityStatus title="Status" value={user.status} />
              </div>
            </div>
          </div>

          <div className="flex justify-between gap-4 text-[1.7rem] md:gap-8 md:text-4xl lg:self-center">
            <EventCount title="Attended" count={user.attended} />
            <hr className="h-28 w-[1px] rounded-lg bg-gray-600" />
            <EventCount title="Organised" count={user.organised} />
          </div>
          <button className="rounded-lg border-2 px-3 py-1 text-2xl md:p-4 md:text-3xl lg:self-center">
            Sign out
          </button>
        </div>
      </div>
    </div>
  );
}
