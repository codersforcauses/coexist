import React, { useEffect, useState } from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface prop {
  success: boolean;
}

export default function SuccessEvent({ success }: prop) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (success) {
      setIsOpen(true);
    }
  }, [success]);

  return (
    <div>
      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Event Created</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogDescription>
            Your event has been created successfully.
          </AlertDialogDescription>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => {
                window.location.reload();
              }}
            >
              Cancel
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
