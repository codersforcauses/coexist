"use client";
import { format as dateFormat } from "date-fns";
import { Mail, Share } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";

interface EventCardProps {
  id: number;
  startTime: Date;
  endTime: Date;
  title: string;
  city: string;
  location: string;
  description: string;
  refImageURL: string;
  rsvpURL: string;
}

const EventCard = ({
  id,
  startTime,
  endTime,
  title,
  city,
  location,
  description,
  refImageURL,
  rsvpURL,
}: EventCardProps) => {
  const start_date_fmt = dateFormat(startTime, "EEEE, do MMM");
  const end_date_fmt = dateFormat(endTime, "EEEE, do MMM");
  const date =
    start_date_fmt == end_date_fmt
      ? start_date_fmt
      : `${start_date_fmt} - ${end_date_fmt}`;
  const start_time_fmt = dateFormat(startTime, "hh:mm aa");
  const end_time_fmt = dateFormat(endTime, "hh:mm aa");

  return (
    <div className="flex w-full flex-col rounded-lg border border-secondary p-6 md:flex-row">
      <div className="order-3 hidden min-w-56 flex-col md:order-2 lg:block">
        <div className="w-fit">
          <p className="px-1 pb-1 text-2xl font-semibold"> {date} </p>
          <hr className="border-b-1 mb-4 border-black" />
        </div>
        <div className="me-5 grid grid-cols-1 place-items-center">
          <p className="mb-5">
            {start_time_fmt} - {end_time_fmt}
          </p>
          <a href={`event/${id}`}>
            <Button
              variant="ghost"
              className="flex flex-row rounded-lg border border-[#5B5A5A] px-5 py-0.5 text-lg font-medium"
            >
              RSVP <Mail className="ml-2"> </Mail>{" "}
            </Button>
          </a>
        </div>
      </div>
      <div className="order-2 mb-2 flex grow flex-col md:order-3">
        <div className="mb-2 flex flex-row items-center gap-x-8 lg:mb-5">
          <a href={`event/${id}`} className="text-3xl font-semibold">
            {title}
          </a>
          <Share className="h-full self-center text-primary"></Share>
        </div>
        <hr className="border-b-1 mb-4 border-secondary lg:hidden" />
        <div className="mb-2 flex justify-between lg:hidden">
          <p className="font-medium">{date}</p>
          <p className="font-medium">
            {start_time_fmt} - {end_time_fmt}
          </p>
        </div>
        <div className="mb-6 flex justify-between gap-x-8 text-lg">
          <p className="rounded-lg bg-[#7D916F] px-5 py-0.5 font-medium text-white">
            {city}
          </p>
          <a href={`event/${id}`}>
            <Button
              variant="ghost"
              className="flex flex-row rounded-lg border border-[#5B5A5A] px-5 py-0.5 text-lg font-medium lg:hidden"
            >
              RSVP <Mail className="ml-2"> </Mail>{" "}
            </Button>
          </a>
          <p className="hidden font-medium lg:block">{location}</p>
        </div>
        <hr className="border-b-1 mb-4 hidden border-black lg:block" />
        <div>
          <p>{description}</p>
        </div>
      </div>
      <a
        href={`event/${id}`}
        className="relative order-1 mb-5 h-64 w-full rounded-lg md:order-3 md:mb-0 md:w-96"
      >
        <Image
          fill
          src={`${refImageURL ? refImageURL : "/tempEventImg.jpeg"}`}
          alt="event image"
          className="h-full w-full rounded-md object-cover md:ps-6"
        />
      </a>
    </div>
  );
};
export default EventCard;
