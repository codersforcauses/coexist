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
  return (
    <div>
      <button
        onClick={() => {
          window.location.href = "/";
        }}
      >
        <AlertDialog open={true}>
          <AlertDialogContent className="border-none bg-transparent shadow-none">
            <Alert variant="destructive" className="border-none bg-[#ffffff]">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                Event failed to get co-exist branches.
              </AlertDescription>
            </Alert>
          </AlertDialogContent>
        </AlertDialog>
      </button>
    </div>
  );
}
