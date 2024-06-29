import { Copy } from "lucide-react";
import { FaRegEdit } from "react-icons/fa";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function EditProfileModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {/* <Button variant="outline">Share</Button> */}
        <Button>
          <FaRegEdit></FaRegEdit>
        </Button>
      </DialogTrigger>
      <DialogContent className="w-11/12 rounded-lg bg-blue-300 md:max-2xl:w-96">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          {/* <DialogDescription>
            Anyone who has this link will be able to view this.
          </DialogDescription> */}
        </DialogHeader>
        <div className="h-28 w-full place-self-center bg-pink-400">
          <form>
            <label htmlFor="fname">First name:</label>
            <input type="text" id="fname" name="fname" />
          </form>
        </div>
        {/* <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter> */}
      </DialogContent>
    </Dialog>
  );
}
