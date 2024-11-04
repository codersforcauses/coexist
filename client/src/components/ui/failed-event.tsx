import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type Props = {
  message: string | null;
  onClose: () => void;
};

export default function FailedEvent({ message, onClose }: Props) {
  return (
    <Dialog open={message !== null} onOpenChange={(v) => !v && onClose()}>
      <DialogContent smallCloseIcon>
        <DialogHeader>
          <DialogTitle className="mb-1.5">Error</DialogTitle>
          <DialogDescription>{message}</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
