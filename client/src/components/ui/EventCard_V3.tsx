import { Mail, Share } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";

interface EventCardProps {
  date: string;
  startTime: string;
  endTime: string;
  title: string;
  city: string;
  location: string;
  description: string;
  image: string;
  rsvpURL: string;
  position: "single" | "first" | "middle" | "last";
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
  image,
  position,
  rsvpURL,
}: EventCardProps) => {
  console.log("EventCard props:", {
    title,
    image,
    // log other props as needed
  });
  const dayOfWeek = getDayOfWeek(date);
  const dayOfMonth = getDayOfMonth(date);
  const MonthStr = getMonthStr(date);
  {
    /*Condition for border radius */
  }
  const containerClasses = `bg-[#9DAD93] p-7 ${
    position === "single"
      ? "rounded-lg"
      : position === "first"
        ? "rounded-t-lg"
        : position === "last"
          ? "rounded-b-lg"
          : ""
  } ${position !== "last" ? "mb-[-1rem]" : ""}`;

  console.log("Rendering image with URL:", image);
  return (
    //Outer container with green background
    <div className={containerClasses}>
      {/* Inner white container */}
      <div className="flex w-full flex-col rounded-lg border border-secondary bg-white p-6 md:flex-row">
        {/* Left side: Calendar details*/}
        <div className="order-3 hidden min-w-56 flex-col md:order-2 lg:block">
          <div className="w-fit">
            <p className="px-1 pb-1 text-2xl font-semibold"> {MonthStr} </p>
            <hr className="border-b-1 mb-4 border-black" />
          </div>
          <div className="me-5 grid grid-cols-1 place-items-center">
            <p className="mb-1 text-5xl font-bold">{dayOfMonth}</p>
            <p className="text-[#5B5A5A]">{dayOfWeek}</p>
            <p className="mb-5">
              {startTime} - {endTime}
            </p>
            <Button
              variant="ghost"
              className="rounded-lg border border-[#5B5A5A] px-5 py-0.5 text-lg font-medium"
            >
              <div className="flex flex-row">
                {" "}
                RSVP <Mail className="ml-2"> </Mail>{" "}
              </div>
            </Button>
          </div>
        </div>
        {/*Right side: event details */}
        <div className="order-2 mb-2 flex grow flex-col md:order-3">
          <div className="mb-2 flex flex-row items-center gap-x-8 lg:mb-5">
            <p className="text-3xl font-semibold">{title}</p>
            <Share className="h-full self-center text-primary"></Share>
          </div>
          <hr className="border-b-1 mb-4 border-secondary lg:hidden" />
          <div className="mb-2 flex justify-between lg:hidden">
            <p className="font-medium">
              {dayOfWeek}, {MonthStr} {dayOfMonth}
            </p>
            <p className="font-medium">
              {startTime} - {endTime}
            </p>
          </div>
          <div className="mb-6 flex justify-between gap-x-8 text-lg">
            <p className="rounded-lg bg-[#7D916F] px-5 py-0.5 font-medium text-white">
              {city}
            </p>
            <Button
              variant="ghost"
              className="rounded-lg border border-[#5B5A5A] px-5 py-0.5 text-lg font-medium lg:hidden"
            >
              <div className="flex flex-row">
                {" "}
                RSVP <Mail className="ml-2"> </Mail>{" "}
              </div>
            </Button>
            <p className="hidden font-medium lg:block">{location}</p>
          </div>
          <hr className="border-b-1 mb-4 hidden border-black lg:block" />
          <div>
            <p>{description}</p>
          </div>
        </div>

        {/* Image goes here */}
        <div className="relative order-1 mb-5 h-64 w-full rounded-lg md:order-3 md:mb-0 md:w-96">
          <Image
            fill
            src={image}
            alt="event image"
            className="h-full w-full rounded-md object-cover md:ps-6"
            onError={(e) => {
              console.error("Error loading image:", image);
            }}
          />
        </div>
      </div>
    </div>
  );
};
export default EventCard;
