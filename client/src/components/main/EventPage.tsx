import { format as dateFormat } from "date-fns";
import { Edit, Eye, Mail } from "lucide-react";
import Image from "next/image";

type EventPageProps = {
  title: string;
  description: string;
  what_to_bring: string;
  image_href: string;
  branch_name: string;
  location: string;
  start_time: string;
  end_time: string;
};

export const EventPage = ({
  title,
  description,
  what_to_bring,
  image_href,
  branch_name,
  location,
  start_time,
  end_time,
}: EventPageProps) => {
  const date_fmt = dateFormat(start_time, "EEEE, do MMM");
  const start_fmt = dateFormat(start_time, "hh:mm aa");
  const end_fmt = dateFormat(end_time, "hh:mm aa");

  return (
    <div className="m-3 h-full rounded-[40px] bg-[#9DAD93] p-3 md:p-6 lg:mx-16">
      <div className="flex h-full flex-col items-center rounded-[32px] bg-white px-8 py-4">
        <div className="text-center text-2xl font-semibold tracking-tight">
          {title}
        </div>
        <div className="my-2 w-full border-t border-black"></div>
        <div className="flex w-full flex-col gap-2 sm:max-w-[80%] md:max-w-[60%] xl:max-w-[35%]">
          <div className="text-center">{description}</div>
          <div className="flex flex-col items-center justify-center gap-1 md:flex-row md:items-start md:gap-3">
            <div className="font-bold">Bring:</div>
            <div className="text-center md:text-left">{what_to_bring}</div>
          </div>
        </div>

        <div className="my-5 grid h-full w-full grid-rows-[1fr,1px,1fr] md:grid-cols-[1fr,1px,1fr] md:grid-rows-[400px]">
          <div className="mb-5 flex flex-col items-center justify-center md:mb-0 md:mr-10 md:items-end">
            <div className="relative h-full max-h-[300px] w-full max-w-[500px]">
              <Image
                fill
                src={image_href}
                alt="Event image"
                className="rounded object-cover"
              />
            </div>
          </div>
          <div className="border-t border-black md:border-l"></div>
          <div className="mt-5 flex flex-col justify-center gap-4 md:ml-10 md:mt-0">
            <div className="flex flex-col gap-1">
              <span className="font-semibold">Location:</span>
              <div className="flex gap-3">
                <span className="self-start rounded bg-[#9DAD93] px-2 text-white">
                  {branch_name}
                </span>
                <span>{location}</span>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-semibold">Event Date:</span>
              <span>{date_fmt}</span>
            </div>
            <div className="flex gap-4">
              <div className="flex flex-col gap-1">
                <span className="font-semibold">Start time:</span>
                <span>{start_fmt}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-semibold">End time:</span>
                <span>{end_fmt}</span>
              </div>
            </div>
          </div>
        </div>

        <button className="flex items-center justify-between gap-2 rounded-xl border border-black px-3 py-1 hover:bg-[#9DAD93]">
          Send RSVP <Mail strokeWidth="1" size="20" />
        </button>
        <div className="mt-2 flex gap-2">
          {/* Only show if user has Poster role */}
          <button className="flex items-center justify-between gap-2 rounded-xl border border-black px-3 py-1 hover:bg-[#9DAD93]">
            Edit <Edit strokeWidth="1" size="20" />
          </button>
          <button className="flex items-center justify-between gap-2 rounded-xl border border-black px-3 py-1 hover:bg-[#9DAD93]">
            View RSVPs <Eye strokeWidth="1" size="20" />
          </button>
        </div>
      </div>
    </div>
  );
};
