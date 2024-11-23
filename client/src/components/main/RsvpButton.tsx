import { Loader, MailPlus, MailX, Trash, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { useGetEvent } from "@/hooks/queries/event";
import { useDelayedPending } from "@/hooks/useDelayedPending";
import { useAddRsvp, useDeleteRsvp, useHasRsvp } from "@/hooks/useRsvp";
import { useUser } from "@/hooks/useUser";

export default function RsvpButton({ eventId }: { eventId: number }) {
  const { data: eventData } = useGetEvent(eventId);
  const { data: userData } = useUser();
  const { data: hasRsvp } = useHasRsvp(eventId);
  const { mutate: addRsvp, isPending: addPending } = useAddRsvp(eventId);
  const { mutate: deleteRsvp, isPending: deletePending } =
    useDeleteRsvp(eventId);

  const isPending = addPending || deletePending;
  const showPending = useDelayedPending(isPending);

  if (
    hasRsvp == undefined ||
    eventData == undefined ||
    userData?.role != "Attendee"
  )
    return <></>;

  return (
    <button
      className="flex w-[9.8rem] items-center justify-between gap-2 rounded-xl border border-black px-2.5 py-1.5 hover:bg-[#9DAD93]"
      onClick={() => {
        if (isPending) return;
        if (hasRsvp) {
          deleteRsvp(undefined, {
            onSuccess: () =>
              toast(
                "You have removed your RSVP. We'll let the event organisers know!",
                { duration: 5000 },
              ),
          });
        } else {
          addRsvp(undefined, {
            onSuccess: () =>
              toast(`Your RSVP to ${eventData.title} has been sent!`, {
                duration: 5000,
                icon: "🎉",
              }),
          });
        }
      }}
    >
      <InsideButton isPending={showPending} hasRsvp={hasRsvp} />
    </button>
  );
}

const InsideButton = ({
  isPending,
  hasRsvp,
}: {
  isPending: boolean;
  hasRsvp: boolean;
}) => {
  if (isPending) {
    return <Loader className="mx-auto animate-spin" />;
  } else if (hasRsvp) {
    return (
      <>
        Cancel RSVP <Trash2 strokeWidth="1" size="20" />
      </>
    );
  } else {
    return (
      <>
        Send RSVP <MailPlus strokeWidth="1" size="20" />
      </>
    );
  }
};
