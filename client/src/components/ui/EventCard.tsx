import Image from "next/image";

export default function EventCard() {
  return (
    <div className="flex w-full rounded-lg border border-[#9DAD93] p-12">
      <div className="min-w-56">
        <div className="w-fit">
          <p className="px-1 pb-1 text-2xl font-semibold">MAY</p>
          <hr className="border-b-1 mb-4 border-black" />
        </div>
        <div className="me-5 grid grid-cols-1 place-items-center">
          <p className="mb-1 text-5xl font-bold">01</p>
          <p className="text-[#5B5A5A]">Monday</p>
          <p className="mb-5">8:00-11:00</p>
          {/* TODO: make actual button component with hover styling etc */}
          {/* TODO: add envelope icon to button */}
          <button className="rounded-lg border border-[#535353] px-5 py-0.5 text-lg font-medium">
            Send RSVP
          </button>
        </div>
      </div>
      <div className="grow">
        <div className="mb-5 flex items-center gap-x-8">
          <p className="text-3xl font-semibold">
            Tree Planting and Social Swim
          </p>
          {/* TODO: use actual share icon and add hover styling */}
          <button className="font-semibold text-[#6C845D]">↑</button>
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
      <div className="relative min-w-96">
        <Image
          fill
          src="/event-image-placeholder.png"
          alt="event image placeholder"
          className="rounded-md ps-6"
          object-fit="cover"
        />
      </div>
    </div>
  );
}
