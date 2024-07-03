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
      <DialogContent className="h-3/5 w-4/5">
        <DialogTitle className="flex items-center gap-5">
          <div>RSVPs for Tree Planting & Social Swim</div>
          <div className="flex items-center gap-1">
            <Users size="18" />
            <span className="text-sm text-neutral-500">{attendees.length}</span>
          </div>
        </DialogTitle>
        <DialogDescription className="overflow-scroll">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>First Name</TableHead>
                <TableHead>Last Name</TableHead>
                <TableHead>Email</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="text-black">
              {attendees.map((a) => (
                <TableRow>
                  <TableCell>{a.firstName}</TableCell>
                  <TableCell>{a.lastName}</TableCell>
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
