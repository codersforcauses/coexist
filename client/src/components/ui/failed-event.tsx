import { AlertCircle } from "lucide-react";
import React, { useEffect, useState } from "react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
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
  failed: boolean;
  setFailed: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function FailedEvent({ failed, setFailed }: prop) {
  return (
    <div>
      <button
        onClick={() => {
          setFailed(false);
        }}
      >
        <AlertDialog open={failed}>
          <AlertDialogContent className="border-none bg-transparent shadow-none">
            <Alert variant="destructive" className="border-none bg-[#ffffff]">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>Event failed to be created.</AlertDescription>
            </Alert>
          </AlertDialogContent>
        </AlertDialog>
      </button>
    </div>
  );
}
