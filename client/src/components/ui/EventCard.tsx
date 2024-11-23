import { format as dateFormat } from "date-fns";
import Image from "next/image";
import Link from "next/link";

import RsvpButton from "@/components/main/RsvpButton";
import { Event } from "@/hooks/queries/event";
import { cn } from "@/lib/utils";

export default function EventCard({
  event: {
    id,
    start_time,
    end_time,
    title,
    description,
    branch,
    location,
    image,
  },
}: {
  event: Event;
}) {
  const startTimeFmt = dateFormat(start_time, "hh:mm aa");
  const endTimeFmt = dateFormat(end_time, "hh:mm aa");
  const startDateFmt = dateFormat(start_time, "EEEE, do MMM");
  const endDateFmt = dateFormat(end_time, "EEEE, do MMM");
  const isMultiDay = startDateFmt !== endDateFmt;

  return (
    <div className="flex flex-col gap-4 rounded-md border px-3 py-4 text-black lg:flex-row xl:gap-8 xl:p-6">
      {/* Image */}
      <Link
        href={`/event/${id}`}
        className={`relative h-52 w-full overflow-hidden rounded-md sm:h-60 md:h-64 lg:order-3 lg:h-64 lg:w-96 ${!image && "hidden items-center justify-center border lg:flex"} `}
      >
        {image ? (
          <Image
            fill
            src={image}
            alt={`Image for ${title}`}
            className="h-full w-full object-cover"
          />
        ) : (
          <span className="italic">No Image</span>
        )}
      </Link>

      {/* Date and Time (Desktop) */}
      <div className="mt-2 hidden w-64 flex-col items-center xl:flex">
        <div className="flex flex-col items-center">
          <span className="text-2xl font-semibold tracking-tight">
            {startDateFmt}
          </span>
          {isMultiDay && (
            <>
              <span className="font-medium italic">until</span>
              <span className="text-2xl font-semibold tracking-tight">
                {endDateFmt}
              </span>
            </>
          )}
        </div>
        <div className="mb-3 mt-2 self-stretch border-b border-black"></div>
        <span className="mb-3 text-center">
          {startTimeFmt} - {endTimeFmt}
        </span>
        <RsvpButton eventId={id} />
      </div>

      {/* Title and Description (Desktop) */}
      <div className="hidden min-w-0 flex-1 xl:block">
        <Link href={`/event/${id}`} className="mb-4 block">
          <h2 className="text-3xl font-semibold tracking-tight">{title}</h2>
        </Link>
        <div className="flex">
          <BranchBadge branch={branch.name} />
          <span className="overflow-hidden text-ellipsis whitespace-nowrap font-medium">
            {location}
          </span>
        </div>
        <div className="mb-4 mt-3 border-b border-black" />
        <p className="line-clamp-5">{description}</p>
      </div>

      {/* Title, Description, Date and Time (Mobile/Tablet) */}
      <div className="flex-1 xl:hidden">
        <Link href={`/event/${id}`} className="block">
          <h2 className="text-3xl font-semibold tracking-tight">{title}</h2>
        </Link>
        <p className="mt-1 w-4/5 overflow-hidden text-ellipsis whitespace-nowrap">
          {location}
        </p>
        <div className="mb-2 mt-3 border-b"></div>
        <div className="flex justify-between font-medium tracking-tight">
          <span className="max-w-[45%]">{startDateFmt}</span>
          <span className="text-right">
            {isMultiDay ? (
              startTimeFmt
            ) : (
              <>
                <span className="text-nowrap">{startTimeFmt}</span> -{" "}
                <span className="text-nowrap">{endTimeFmt}</span>
              </>
            )}
          </span>
        </div>
        <div className="mt-2 flex justify-between">
          <BranchBadge branch={branch.name} className="" />
          <RsvpButton eventId={id} />
        </div>
        <p className="mt-4 line-clamp-2 md:line-clamp-3">{description}</p>
      </div>
    </div>
  );
}

function BranchBadge({
  branch,
  className,
}: {
  branch: string;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "mr-3 inline-flex items-center rounded-lg bg-primary px-5 py-0.5 font-medium text-white",
        className,
      )}
    >
      {branch}
    </span>
  );
}
