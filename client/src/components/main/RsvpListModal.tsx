import { Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
      <DialogTrigger>
        <Button variant="outline">Show RSVPs</Button>
      </DialogTrigger>
      <DialogContent className="max-h-96 w-full max-w-4xl">
        <DialogTitle className="flex items-center gap-5">
          <div>RSVPs for Tree Planting & Social Swim</div>
          <div className="flex items-center gap-1">
            <Users size="18" />
            <span className="text-sm text-neutral-500">{attendees.length}</span>
          </div>
        </DialogTitle>
        <DialogDescription className="max-h-80 overflow-y-scroll">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="border-r-2">First Name</TableHead>
                <TableHead className="border-r-2">Last Name</TableHead>
                <TableHead>Email</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="text-black">
              {attendees.map((a) => (
                <TableRow>
                  <TableCell className="border-r-2">{a.firstName}</TableCell>
                  <TableCell className="border-r-2">{a.lastName}</TableCell>
                  <TableCell>{a.email}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}
