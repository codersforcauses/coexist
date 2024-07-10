import { Mail, Share } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";

interface EventCardProps {
  date: String;
  startTime: String;
  endTime: String;
  title: String;
  city: String;
  location: String;
  description: String;
  refImageURL: String;
  rsvpURL: String;
}

function getDayOfWeek(dateString: string): string {
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const date = new Date(dateString);
  const dayIndex = date.getDay();
  return daysOfWeek[dayIndex];
}

function getDayOfMonth(dateString: string): number {
  const date = new Date(dateString);
  return date.getDate();
}

function getMonthStr(dateString: string): string {
  const monthAbbr = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const date = new Date(dateString);
  const monthIndex = date.getMonth();
  return monthAbbr[monthIndex];
}

const EventCard = ({
  date,
  startTime,
  endTime,
  title,
  city,
  location,
  description,
  refImageURL,
  rsvpURL,
}: EventCardProps) => {
  const dayOfWeek = getDayOfWeek(date);
  const dayOfMonth = getDayOfMonth(date);
  const MonthStr = getMonthStr(date);

  return (
    <div className="flex w-full flex-col rounded-lg border border-secondary p-6 md:flex-row">
      <div className="order-3 flex min-w-56 flex-col md:order-2">
        <div className="w-fit">
          <p className="px-1 pb-1 text-2xl font-semibold"> {MonthStr} </p>
          <hr className="border-b-1 mb-4 border-black" />
        </div>
        <div className="me-5 grid grid-cols-1 place-items-center">
          <p className="mb-1 text-5xl font-bold">{dayOfMonth}</p>
          <p className="text-[#5B5A5A]">{dayOfWeek}</p>
          <p className="mb-5">
            {startTime}-{endTime}
          </p>
          <Button
            variant="ghost"
            className="rounded-lg border border-[#535353] px-5 py-0.5 text-lg font-medium"
          >
            <div className="flex flex-row">
              {" "}
              RSVP <Mail className="ml-2"> </Mail>{" "}
            </div>
          </Button>
        </div>
      </div>
      <div className="order-2 mb-2 flex grow flex-col md:order-3">
        <div className="mb-5 flex flex-row items-center gap-x-8">
          <p className="text-3xl font-semibold">{title}</p>
          <Share className="h-full self-center text-[#6C845D]"></Share>
        </div>
        <div className="mb-6 flex gap-x-8 text-lg">
          <p className="rounded-lg bg-[#6C845D] px-5 py-0.5 font-medium text-white">
            {city}
          </p>
          <p className="font-medium">{location}</p>
        </div>
        <hr className="border-b-1 mb-4 border-black" />
        <div>
          <p>{description}</p>
        </div>
      </div>
      <div className="relative order-1 mb-5 h-64 w-full rounded-lg md:order-3 md:mb-0 md:w-96">
        <Image
          fill
          src="/tempEventImg.jpeg"
          alt="event image placeholder"
          className="h-full w-full rounded-md object-cover md:ps-6"
        />
      </div>
    </div>
  );
};
export default EventCard;
