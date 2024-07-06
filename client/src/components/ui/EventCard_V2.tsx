import { Mail, Share } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";

export default function EventCard() {
  return (
    <div className="flex w-full flex-col rounded-lg border border-secondary p-12 md:flex-row">
      <div className="order-3 flex min-w-56 flex-col md:order-2">
        <div className="w-fit">
          <p className="px-1 pb-1 text-2xl font-semibold"> MAY </p>
          <hr className="border-b-1 mb-4 border-black" />
        </div>
        <div className="me-5 grid grid-cols-1 place-items-center">
          <p className="mb-1 text-5xl font-bold">01</p>
          <p className="text-[#5B5A5A]">Monday</p>
          <p className="mb-5">8:00-11:00</p>
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
          <p className="text-3xl font-semibold">
            Tree Planting and Social Swim
          </p>
          <Share className="h-full self-center text-[#6C845D]"></Share>
        </div>
        <div className="mb-6 flex gap-x-8 text-lg">
          <p className="rounded-lg bg-[#6C845D] px-5 py-0.5 font-medium text-white">
            Cairns
          </p>
          <p className="font-medium">Glenoma park, Brinstead</p>
        </div>
        <hr className="border-b-1 mb-4 border-black" />
        <p className="mb-2">
          3 hours of Fun, Tree Planting, Music, Swims & Food (Snacks Provided!)
        </p>
        <div className="flex gap-x-3">
          <b>Bring:</b>
          <p>
            Your hat, water bottle, sunscreen and swimmers for the fresh water
            creek hangout
          </p>
        </div>
      </div>
      <div className="relative order-1 h-64 w-full md:order-3 md:w-96">
        <Image
          fill
          src="/placeholder.png"
          alt="event image placeholder"
          className="h-full w-full rounded-md object-cover ps-6"
        />
      </div>
    </div>
  );
}
