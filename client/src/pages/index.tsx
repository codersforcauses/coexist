import { Work_Sans as FontSans } from "next/font/google";
import { useState } from "react";

import Header from "@/components/main/header/Header";
import EventCard from "@/components/ui/EventCard_V3";
import { usePings } from "@/hooks/pings";
import { cn } from "@/lib/utils";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

{
  /* Example data for event card */
}
const EventData = {
  //example data
  date: "2023-05-01",
  name: "Tree Planting & Social Swim",
  location: "Glenoma Park, Brinsmead",
  city: "Cairns",
  description:
    "2 hours of fun, Tree planting, Music, Swims and food (snacks provided)",
  items: [
    "Your hat,",
    "Water bottle,",
    "sunscreen,",
    "swimmers for fresh water creek hangout :)",
  ],
  refImageURL: "/tempEventImg.jpeg",
  rvspURL: "nil",
  startTime: "08:00",
  endTime: "11:00",
};

export default function Home() {
  const [clicked, setClicked] = useState(false);
  const { data, isLoading } = usePings({
    enabled: clicked,
  });

  const repeatCount = 3;

  {
    /*   const [isSignUpOpen, setSignUp] = useState(false);
     */
  }

  return (
    <main
      className={cn(
        "m-0 flex min-h-screen flex-col items-center p-0 font-sans",
        fontSans.variable,
      )}
    >
      {/* The EventCard */}
      <div className="p-5">
        <div className="mb-5 mt-4 flex items-center justify-start">
          <h1 className="mr-5 text-xl font-bold">Upcoming Events</h1>
          <button className="mx-6 flex items-center rounded-lg border-2 border-gray-500 px-4 py-1 text-black">
            <span className="font-medium">Sign Up or Login to RSVP</span>
            {/* Add your icon here */}
            {/* <FontAwesomeIcon icon={faEnvelope} />*/}
          </button>
        </div>

        {Array(repeatCount)
          .fill(null)
          .map((_, index) => (
            <EventCard
              key={index}
              date={EventData.date}
              title={EventData.name}
              city={EventData.city}
              location={EventData.location}
              description={EventData.description}
              position={
                repeatCount === 1
                  ? "single"
                  : index === 0
                    ? "first"
                    : index === repeatCount - 1
                      ? "last"
                      : "middle"
              }
              startTime={EventData.startTime}
              endTime={EventData.endTime}
              rsvpURL={EventData.rvspURL}
              refImageURL={EventData.refImageURL}
            />
          ))}
      </div>
    </main>
  );
}
