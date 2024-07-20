import { Users } from "lucide-react";
import React, { useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/BetterDialog";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEventDetails, useRSVPs } from "@/hooks/getRSVPs";
import api from "@/lib/api";

interface RsvpListModalProps {
  eventId: number;
}

export default function RsvpListModal({ eventId }: RsvpListModalProps) {
  const {
    data: attendees,
    error: rsvpError,
    isLoading: rsvpsLoading,
  } = useRSVPs(eventId);
  const {
    data: eventDetails,
    error: eventError,
    isLoading: eventLoading,
  } = useEventDetails(eventId);

  if (rsvpsLoading || eventLoading) {
    return <div>Loading...</div>;
  }

  if (rsvpError) {
    console.error("Error fetching RSVPs:", rsvpError);
    return <div>Error fetching RSVPs</div>;
  }

  if (eventError) {
    console.error("Error fetching Event details:", eventError);
    return <div>Error fetching Event details</div>;
  }

  return (
    <Dialog>
      <DialogTrigger className="rounded border border-black p-2">
        Show RSVPs
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <div className="flex flex-col gap-4 md:flex-row">
            <DialogTitle>{eventDetails?.title} </DialogTitle>
            <div className="flex items-center gap-1">
              <Users size="18" />
              <span className="text-sm text-neutral-500">
                {attendees?.length}
              </span>
            </div>
          </div>
        </DialogHeader>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="border-b border-r border-[#7D916F] text-black">
                Username
              </TableHead>
              <TableHead className="border-b border-r border-[#7D916F] text-black">
                Last Name
              </TableHead>
              <TableHead className="border-b border-r border-[#7D916F] text-black">
                Email
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="text-black">
            {attendees?.map((a) => (
              <TableRow key={a.user.email}>
                <TableCell className="border-r border-t border-r-[#7D916F] border-t-[#DEE4DB]">
                  {a.user.first_name}
                </TableCell>
                <TableCell className="border-r border-t border-r-[#7D916F] border-t-[#DEE4DB]">
                  {a.user.last_name}
                </TableCell>
                <TableCell className="text6789-[#5C764B] border-t border-t-[#DEE4DB] underline">
                  <a href={`mailto:${a.user.email}`}>{a.user.email}</a>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </DialogContent>
    </Dialog>
  );
}
