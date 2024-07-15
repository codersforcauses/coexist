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
  return (
    <AlertDialog open={success}>
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
              window.location.href = "/";
            }}
          >
            Close
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
