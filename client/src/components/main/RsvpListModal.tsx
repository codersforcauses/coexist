import { Users, X } from "lucide-react";
import { useRef, useState } from "react";

import { Button } from "../ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

export default function RsvpListModal() {
  const [show, setShow] = useState(false);

  const background = useRef(null);

  function toggle() {
    setShow((v) => !v);
  }

  function clickOff(e: any) {
    if (e.target === background.current) {
      toggle();
    }
  }

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
    <>
      <Button variant="outline" onClick={toggle}>
        Open Dialog
      </Button>
      <div
        className={`fixed left-0 top-0 flex h-full w-full items-center justify-center bg-neutral-600/50 ${show ? "block" : "hidden"}`}
        ref={background}
        onClick={clickOff}
      >
        <div
          className={`flex h-full w-full flex-col gap-3 rounded bg-neutral-50 p-4 md:h-4/5 md:w-4/5 lg:h-3/5 lg:w-3/5`}
        >
          <div className="flex items-center justify-between py-1">
            <div className="flex flex-col gap-4 md:flex-row">
              <h1 className="text-lg font-semibold leading-none tracking-tight">
                RSVPs for Tree Planting & Social Swim
              </h1>
              <div className="flex items-center gap-1">
                <Users size="18" />
                <span className="text-sm text-neutral-500">
                  {attendees.length}
                </span>
              </div>
            </div>
            <button onClick={toggle}>
              <X className="h-7 w-7"></X>
            </button>
          </div>
          <div className="overflow-y-auto">
            <Table className="">
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
          </div>
        </div>
      </div>
    </>
  );
}
