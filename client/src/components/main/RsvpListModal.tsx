import { Users } from "lucide-react";

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

export default function RsvpListModal() {
  const attendees = [
    {
      firstName: "John",
      lastName: "Doe",
      email: "j.d@email.com",
    },
    {
      firstName: "John",
      lastName: "Doe",
      email: "j.d@email.com",
    },
    {
      firstName: "John",
      lastName: "Doe",
      email: "j.d@email.com",
    },
    {
      firstName: "John",
      lastName: "Doe",
      email: "j.d@email.com",
    },
    {
      firstName: "John",
      lastName: "Doe",
      email: "j.d@email.com",
    },
    {
      firstName: "John",
      lastName: "Doe",
      email: "j.d@email.com",
    },
    {
      firstName: "John",
      lastName: "Doe",
      email: "j.d@email.com",
    },
    {
      firstName: "John",
      lastName: "Doe",
      email: "j.d@email.com",
    },
    {
      firstName: "John",
      lastName: "Doe",
      email: "j.d@email.com",
    },
    {
      firstName: "John",
      lastName: "Doe",
      email: "j.d@email.com",
    },
  ];

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
              <TableHead className="border-b border-[#7D916F] text-black">
                Email
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="text-black">
            {attendees.map((a) => (
              <TableRow key={a.email}>
                <TableCell className="border-r border-t border-r-[#7D916F] border-t-[#DEE4DB]">
                  {a.firstName}
                </TableCell>
                <TableCell className="border-r border-t border-r-[#7D916F] border-t-[#DEE4DB]">
                  {a.lastName}
                </TableCell>
                <TableCell className="border-t border-t-[#DEE4DB] text-[#5C764B] underline">
                  <a href={`mailto:${a.email}`}>{a.email}</a>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </DialogContent>
    </Dialog>
  );
}
