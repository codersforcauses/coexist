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

export default function FailedBranch() {
  let [open, setOpen] = useState(true);
  return (
    <div>
      <button
        onClick={() => {
          setOpen(false);
        }}
      >
        <AlertDialog open={open}>
          <AlertDialogContent className="border-none bg-transparent shadow-none">
            <Alert variant="destructive" className="border-none bg-[#ffffff]">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                Server failed to get co-exist branches.
              </AlertDescription>
            </Alert>
          </AlertDialogContent>
        </AlertDialog>
      </button>
    </div>
  );
}
