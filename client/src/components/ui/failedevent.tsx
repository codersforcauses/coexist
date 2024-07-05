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
  setFailed: any;
}

export default function FailedEvent({ failed, setFailed }: prop) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (failed) {
      setIsOpen(true);
    }
  }, [failed]);

  return (
    <div>
      <button
        onClick={() => {
          setIsOpen(false);
          setFailed(false);
        }}
      >
        <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
          <AlertDialogContent className="border-none bg-transparent">
            <Alert variant="destructive">
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
