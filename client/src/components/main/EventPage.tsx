import { format as dateFormat } from "date-fns";
import { Edit, Mail, X } from "lucide-react";
import Image from "next/image";

import { type Event } from "@/hooks/useEvent";
import { useAddRsvp, useDeleteRsvp, useHasRsvp } from "@/hooks/useRsvp";
import useUser from "@/hooks/useUser";

import RsvpListModal from "./RsvpListModal";

type EventPageProps = {
  event: Event;
};

export const EventPage = ({
  event: {
    id,
    title,
    description,
    image,
    branch,
    location,
    start_time,
    end_time,
    status,
  },
}: EventPageProps) => {
  const date_fmt = dateFormat(start_time, "EEEE, do MMM");
  const start_fmt = dateFormat(start_time, "hh:mm aa");
  const end_fmt = dateFormat(end_time, "hh:mm aa");

  const user_query = useUser();
  const rsvp_query = useHasRsvp(id);
  const { mutate: addRsvp } = useAddRsvp(id);
  const { mutate: deleteRsvp } = useDeleteRsvp(id);

  const attendeeControls = () => {
    if (status != "Upcoming") {
      return <></>;
    } else if (rsvp_query.data) {
      return (
        <button
          className="flex items-center justify-between gap-2 rounded-xl border border-black px-3 py-1 hover:bg-[#9DAD93]"
          onClick={() => {
            deleteRsvp();
          }}
        >
          Remove RSVP <X strokeWidth="1" size="20" />
        </button>
      );
    } else {
      return (
        <button
          className="flex items-center justify-between gap-2 rounded-xl border border-black px-3 py-1 hover:bg-[#9DAD93]"
          onClick={() => {
            addRsvp();
          }}
        >
          Send RSVP <Mail strokeWidth="1" size="20" />
        </button>
      );
    }
  };

  const posterControls = (
    <div className="mt-2 flex gap-2">
      TODO: Needs to be connected to Edit Event modal
      <button className="flex items-center justify-between gap-2 rounded-xl border border-black px-3 py-1 hover:bg-[#9DAD93]">
        Edit <Edit strokeWidth="1" size="20" />
      </button>
      <div className="flex items-center justify-between gap-2 rounded-xl border border-black px-3 py-1 hover:bg-[#9DAD93]">
        <RsvpListModal eventId={id} />
      </div>
    </div>
  );

  const controls = () => {
    if (
      user_query.error?.response?.status === 401 ||
      rsvp_query.error?.response?.status === 401 ||
      user_query.data === undefined ||
      rsvp_query.data === undefined
    ) {
      return <></>;
    } else if (user_query.isLoading) {
      return <div>Loading</div>;
    } else if (user_query.data.role === "Attendee") {
      return attendeeControls();
    } else {
      return posterControls;
    }
  };

  const renderImage = () => {
    if (image != null) {
      return (
        <Image
          fill
          unoptimized={true}
          src={image}
          alt="Event image"
          className="rounded object-cover"
        />
      );
    } else {
      return <span className="italic">No image provided for this event</span>;
    }
  };

  return (
    <div className="m-3 h-full rounded-[40px] bg-[#9DAD93] p-3 md:p-6 lg:mx-16">
      <div className="flex h-full flex-col items-center rounded-[32px] bg-white px-8 py-4">
        <div className="text-center text-2xl font-semibold tracking-tight">
          {title}
        </div>
        <div className="my-2 w-full border-t border-black"></div>
        <div className="flex w-full flex-col gap-2 sm:max-w-[80%] md:max-w-[60%] xl:max-w-[35%]">
          <div className="text-center">{description}</div>
        </div>

        <div className="my-5 grid h-full w-full grid-rows-[1fr,1px,1fr] md:grid-cols-[1fr,1px,1fr] md:grid-rows-[400px]">
          <div className="mb-5 flex flex-col items-center justify-center md:mb-0 md:mr-10 md:items-end">
            <div className="relative flex h-full max-h-[300px] w-full max-w-[500px] items-center justify-center">
              {renderImage()}
            </div>
          </div>
          <div className="border-t border-black md:border-l"></div>
          <div className="mt-5 flex flex-col justify-center gap-4 md:ml-10 md:mt-0">
            <div className="flex flex-col gap-1">
              <span className="font-semibold">Status:</span>
              <div className="flex gap-3">
                <span
                  className={`self-start rounded ${status == "Cancelled" && "bg-red-500"} ${(status === "Upcoming" || status === "Ongoing") && "bg-[#9DAD93]"} ${status === "Past" && "bg-yellow-500"} px-2 text-white`}
                >
                  {status}
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-semibold">Location:</span>
              <div className="flex gap-3">
                <span className="self-start rounded bg-[#9DAD93] px-2 text-white">
                  {branch.name}
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

        {controls()}
      </div>
    </div>
  );
};
