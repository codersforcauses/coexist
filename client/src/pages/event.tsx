import { Mail } from "lucide-react";
import Image from "next/image";

export default function Event() {
  const event = {
    title: "Tree Planting & Social Swim",
    description:
      "3 hours of Fun, Tree Planting, Music, Swims & Food (Snacks Provided!)",
    what_to_bring:
      "Your hat, water bottle, sunscreen and swimmers for the fresh water creek hangout :)",
    branch_name: "Cairns",
    image_href: "/eventImageInsta.jpg",
    location: "Glenoma Park, Brinsmead",
    date: "Monday, 1st May",
    start_time: "08:00 am",
    end_time: "11:00 am",
  };

  return (
    <div className="m-3 h-full rounded-lg bg-[#9DAD93] p-3 md:p-6">
      <div className="flex h-full flex-col items-center rounded-lg bg-white px-8 py-4">
        <div className="text-center text-2xl font-semibold tracking-tight">
          {event.title}
        </div>
        <div className="my-2 w-full border-t border-black"></div>
        <div className="flex w-full flex-col gap-2 sm:max-w-[80%] md:max-w-[60%] xl:max-w-[35%]">
          <div className="text-center">{event.description}</div>
          <div className="flex flex-col items-center justify-center gap-1 md:flex-row md:items-start md:gap-3">
            <div className="font-bold">Bring:</div>
            <div className="text-center md:text-left">
              {event.what_to_bring}
            </div>
          </div>
        </div>

        <div className="my-5 grid h-full w-full grid-rows-[1fr,1px,1fr] md:grid-cols-[1fr,1px,1fr] md:grid-rows-[500px]">
          <div className="mb-5 flex flex-col items-center justify-center md:mb-0 md:mr-10 md:items-end">
            <div className="relative h-full max-h-[300px] w-full max-w-[500px]">
              <Image
                fill={true}
                src={event.image_href}
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
                <div className="self-start rounded bg-[#9DAD93] px-2 text-white">
                  {event.branch_name}
                </div>
                <span>{event.location}</span>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-semibold">Event Date:</span>
              <span>{event.date}</span>
            </div>
            <div className="flex gap-4">
              <div className="flex flex-col gap-1">
                <span className="font-semibold">Start time:</span>
                <span>{event.start_time}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-semibold">End time:</span>
                <span>{event.end_time}</span>
              </div>
            </div>
          </div>
        </div>

        <button className="flex items-center gap-2 rounded-xl border border-black px-3 py-1 hover:bg-[#9DAD93]">
          Send RSVP <Mail strokeWidth="1" size="20" />
        </button>
      </div>
    </div>
  );
}
