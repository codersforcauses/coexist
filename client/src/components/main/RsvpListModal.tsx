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
import api from "@/lib/api";

interface User {
  first_name: string;
  last_name: string;
  email: string;
}

interface RSVP {
  user: User;
}

interface RsvpListModalProps {
  eventId: number;
}

export default function RsvpListModal({ eventId }: RsvpListModalProps) {
  const [attendees, setAttendees] = useState<RSVP[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRSVPs() {
      try {
        const response = await api.get(
          `/event/${eventId}/rsvp/`, //add auth token here
        );

        const data = await response.data;
        setAttendees(data);
      } catch (error) {
        console.error("Error fetching RSVPs:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchRSVPs();
  }, [eventId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Dialog>
      <DialogTrigger className="rounded border border-black p-2">
        Show RSVPs
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <div className="flex flex-col gap-4 md:flex-row">
            <DialogTitle>RSVPs for Tree Planting & Social Swim</DialogTitle>
            <div className="flex items-center gap-1">
              <Users size="18" />
              <span className="text-sm text-neutral-500">
                {attendees.length}
              </span>
            </div>
          </div>
        </DialogHeader>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="border-b border-r border-[#7D916F] text-black">
                First Name
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
            {attendees.map((a) => (
              <TableRow key={a.user.email}>
                <TableCell className="border-r border-t border-r-[#7D916F] border-t-[#DEE4DB]">
                  {a.user.first_name}
                </TableCell>
                <TableCell className="border-r border-t border-r-[#7D916F] border-t-[#DEE4DB]">
                  {a.user.last_name}
                </TableCell>
                <TableCell className="border-t border-t-[#DEE4DB] text-[#5C764B] underline">
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
