// src/components/main/EventCard.tsx

import Image from "next/image";
import React from "react";

{
  /*import { faEnvelope } from "@fortawesome/free-regular-svg-icons";}
{import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";} */
}

interface Props {
  date: string;
  name: string;
  location: string;
  description: string;
  items?: string[];
  position: "single" | "first" | "middle" | "last";
}

function EventCard({
  date,
  name,
  location,
  description,
  items = [],
  position,
}: Props) {
  const containerClasses = `bg-[#9DAD93] p-7 ${
    position === "single"
      ? "rounded-lg"
      : position === "first"
        ? "rounded-t-lg"
        : position === "last"
          ? "rounded-b-lg"
          : ""
  } ${position !== "last" ? "mb-[-1rem]" : ""}`;

  return (
    // outer container with green background
    <div className={containerClasses}>
      {/* Inner white container */}
      <div className="flex items-center rounded-lg bg-white p-6">
        {/* Left side: Calendar details*/}
        <div className="h-full p-2 text-center">
          <div className="text-2xl font-bold">MAY</div>
          <div className="text-5xl font-bold">01</div>
          <div className="font-semibold text-gray-500">Monday</div>
          <div className="font-semibold">08:00 - 11:00</div>
          <button className="mt-5 flex items-center rounded-xl border-2 border-gray-500 px-4 py-1 text-black">
            <span className="font-semibold">Send RSVP</span>
            {/* Add your icon here */}
            {/* <FontAwesomeIcon icon={faEnvelope} />*/}
          </button>
        </div>
        {/*Right side: event details */}
        <div className="ml-4 flex-1">
          <h2 className="mb-4 text-2xl font-bold">{name}</h2>
          <div
            className="text-m text-sm font-medium"
            style={{ borderBottom: "2px solid #9DAD93", paddingBottom: "16px" }}
          >
            <span className="mr-4 items-center rounded-lg bg-[#7D916F] p-1 text-white">
              Cairns
            </span>
            <span className="font-semibold">{location}</span>
          </div>
          <p className="mt-2 font-medium">{description}</p>
          <div className="mt-4">
            <div className="font-medium">
              <h3 className="font-bold">Bring:</h3>
              {items.map((item, index) => (
                <span key={index}>{item} </span>
              ))}
            </div>
          </div>
        </div>

        {/* Image goes here */}
        <div className="ml-4 flex flex-1 items-center justify-center">
          <Image
            src="/tree-plant.avif"
            width={350}
            height={200}
            className="rounded-lg"
            alt="tree planting"
          />{" "}
        </div>
      </div>
    </div>
  );
}

export default EventCard;
