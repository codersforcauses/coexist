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

import { ButtonLoading } from "./loading";

interface prop {
  loading: boolean;
}

export default function LoadingEvent({ loading }: prop) {
  return (
    <AlertDialog open={loading}>
      <AlertDialogContent className="border-none bg-transparent shadow-none">
        <ButtonLoading></ButtonLoading>
      </AlertDialogContent>
    </AlertDialog>
  );
}
