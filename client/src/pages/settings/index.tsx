import { Pen } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

function EventCount({ title, count }: { title: string; count: number }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <p className="">{title}</p>
      <p>{count}</p>
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
      <h1 className="text-left text-2xl font-semibold md:text-5xl">
        My Profile
      </h1>
      <div className="flex w-full flex-grow justify-center rounded-lg bg-lime-700 p-5">
        <div className="flex flex-1 flex-col items-center justify-between gap-5 rounded-lg bg-white px-4 py-6 lg:items-start">
          <div className="flex flex-col items-center gap-10 lg:flex-row">
            <Avatar className="mb-1 h-44 w-44 md:h-64 md:w-64">
              <AvatarImage src={user.image} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="flex flex-col items-center justify-center">
              <div className="flex items-center gap-2 text-4xl font-semibold md:text-5xl">
                <p> {user.name}</p>
                <button>
                  <Pen className="text-lime-500" />
                </button>
              </div>
              <p className="text-green-500 md:text-2xl">{user.email}</p>
              <div className="m-5 grid grid-cols-2 gap-x-7 gap-y-2 text-xl md:text-4xl">
                <CityStatus title="City" value={user.city} />
                <CityStatus title="Status" value={user.status} />
              </div>
            </div>
          </div>

          <div className="flex justify-between gap-4 text-[1.7rem] md:text-4xl lg:self-center">
            <EventCount title="Attended" count={user.attended} />
            <hr className="h-28 w-[1px] rounded-lg bg-gray-600" />
            <EventCount title="Organised" count={user.organised} />
          </div>
          <button className="rounded-lg border-2 px-3 py-1 text-2xl lg:self-center">
            Sign out
          </button>
        </div>
      </div>
    </div>
  );
}
