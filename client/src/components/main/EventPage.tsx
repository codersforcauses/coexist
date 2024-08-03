import { format as dateFormat } from "date-fns";
import { Edit, Mail, X } from "lucide-react";
import Image from "next/image";

import { type Event } from "@/hooks/useEvent";
import { useAddRsvp, useDeleteRsvp, useHasRsvp } from "@/hooks/useRsvp";
import useUser from "@/hooks/useUser";

import LogInModal from "../ui/LogInModal";
import SignUpModal from "../ui/SignUpModal";
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
    location_url,
    start_time,
    end_time,
    payment_link,
    status,
  },
}: EventPageProps) => {
  const start_date_fmt = dateFormat(start_time, "EEEE, do MMM");
  const end_date_fmt = dateFormat(end_time, "EEEE, do MMM");
  const date_fmt =
    start_date_fmt == end_date_fmt
      ? start_date_fmt
      : `${start_date_fmt} - ${end_date_fmt}`;

  const start_time_fmt = dateFormat(start_time, "hh:mm aa");
  const end_time_fmt = dateFormat(end_time, "hh:mm aa");

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

  const controls = () => {
    if (
      user_query.error?.response?.status === 401 ||
      rsvp_query.error?.response?.status === 401 ||
      user_query.data === undefined ||
      rsvp_query.data === undefined
    ) {
      return (
        <span>
          <span className="font-bold">NOTE:</span> You are required to RSVP to
          this event. Please{" "}
          <SignUpModal>
            <a className="cursor-pointer text-[#9DAD93] hover:text-[#6B7B6B]">
              make an account
            </a>
          </SignUpModal>{" "}
          or{" "}
          <LogInModal>
            <a className="cursor-pointer text-[#9DAD93] hover:text-[#6B7B6B]">
              login
            </a>
          </LogInModal>{" "}
          to proceed.
        </span>
      );
    } else if (user_query.isLoading) {
      return <>Loading</>;
    } else if (user_query.data.role === "Attendee") {
      return attendeeControls();
    } else {
      return (
        <div className="mt-2 flex gap-2">
          {/* TODO: Needs to be connected to Edit Event modal */}
          <button className="flex items-center justify-between gap-2 rounded-xl border border-black px-3 py-1 hover:bg-[#9DAD93]">
            Edit <Edit strokeWidth="1" size="20" />
          </button>
          <div className="flex items-center justify-between gap-2 rounded-xl border border-black px-3 py-1 hover:bg-[#9DAD93]">
            <RsvpListModal eventId={id} />
          </div>
        </div>
      );
    }
  };

  return (
    <div className="m-3 flex flex-col rounded-[13px] border-2 border-[#9DAD93] p-3 md:p-6 lg:mx-16">
      <span className="text-3xl font-semibold tracking-tight">{title}</span>
      <div className="my-4 border-t border-black"></div>
      <div className="flex flex-col gap-5 lg:flex-row lg:gap-10 lg:[&>*]:flex-1">
        {/* Description and Image */}
        <div className="flex flex-col gap-6">
          <div className="whitespace-pre-wrap">{description}</div>
          {image && (
            <div className="relative mx-auto flex h-[350px] w-full items-center justify-center lg:w-[95%]">
              <Image
                fill
                unoptimized
                src={image}
                alt="Event image"
                className="rounded object-cover"
              />
            </div>
          )}
        </div>
        {/* Information, Map and Controls */}
        <div className="flex w-full flex-col gap-6 lg:[&>*]:mx-auto lg:[&>*]:w-[90%]">
          {/* Date/Time, Status and Location */}
          <div className="flex flex-col gap-5 lg:flex-row lg:justify-between">
            <div className="flex flex-col gap-2">
              <div className="flex flex-col gap-1">
                <span className="font-semibold">Event Date:</span>
                <span>{date_fmt}</span>
              </div>
              <div className="flex gap-4">
                <div className="flex flex-col gap-1">
                  <span className="font-semibold">Start time:</span>
                  <span className="whitespace-nowrap">{start_time_fmt}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-semibold">End time:</span>
                  <span className="whitespace-nowrap">{end_time_fmt}</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex gap-14">
                <div className="flex flex-col gap-1">
                  <span className="font-semibold">Branch:</span>
                  <a href={`/branch/${branch.name}`}>{branch.name}</a>
                </div>
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
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-semibold">Location:</span>
                <span>{location}</span>
              </div>
            </div>
          </div>
          {/* Location Map */}
          {location_url && (
            <iframe
              src={location_url}
              className="aspect-[2/1] w-full rounded-lg border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          )}
          {/* Links and Controls */}
          <div className="flex flex-col items-center gap-3 lg:items-start">
            {!!payment_link && status == "Upcoming" && (
              <a
                href={payment_link}
                className="text-[#9DAD93] underline hover:text-[#6B7B6B]"
              >
                Payment Required (CLICK HERE)
              </a>
            )}
            <div className="flex gap-3">{controls()}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
