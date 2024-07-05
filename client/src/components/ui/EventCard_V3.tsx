import Image from "next/image";

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

//suggestion: heroicons for share, envelope and calendar icons

const EventCard = ({
  date,
  startTime,
  endTime,
  title,
  city,
  location,
  description,
  itemsToBring,
  refImageURL,
  rvspURL,
}) => {
  const dayOfWeek = getDayOfWeek(date);
  const dayOfMonth = getDayOfMonth(date);
  const MonthStr = getMonthStr(date);

  return (
    <div className="flex w-full flex-row rounded-lg border border-secondary p-12">
      <div className="order-1 flex min-w-56 flex-col">
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
          {/* TODO: make actual button component with hover styling etc */}
          {/* TODO: add envelope icon to button */}
          <button
            className="rounded-lg border border-[#535353] px-5 py-0.5 text-lg font-medium"
            onClick={() => (window.location.href = { rvspURL })}
          >
            Send RSVP
          </button>
        </div>
      </div>
      <div className="order-2 flex grow flex-col">
        <div className="mb-5 flex items-center gap-x-8">
          <p className="text-3xl font-semibold">{title}</p>
          {/* TODO: use actual share icon and add hover styling */}
          <button className="font-semibold text-[#6C845D]">↑</button>
        </div>
        <div className="mb-6 flex gap-x-8 text-lg">
          <p className="rounded-lg bg-[#6C845D] px-5 py-0.5 font-medium text-white">
            {city}
          </p>
          <p className="font-medium">{location}</p>
        </div>
        <hr className="border-b-1 mb-4 border-black" />
        <p className="mb-2">{description}</p>
        <div className="flex gap-x-3">
          <b>Bring:</b>
          <p>{itemsToBring}</p>
        </div>
      </div>
      <div className="relative order-3 min-w-96">
        <Image
          fill
          src={refImageURL}
          alt="event image placeholder"
          className="rounded-md ps-6"
          object-fit="cover"
        />
      </div>
    </div>
  );
};
