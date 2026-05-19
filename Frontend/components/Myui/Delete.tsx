import { Shield, Trash2Icon, X } from "lucide-react";
import { Button } from "../ui/button";

interface deleteprops {
  close: React.Dispatch<React.SetStateAction<boolean>>;
  del: () => void;
}

export default function Delete({ close, del }: deleteprops) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-xl border border-border bg-card p-6 shadow-lg animate-in fade-in-0 zoom-in-95">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-foreground">
            Delete Expense
          </h2>
          <button
            onClick={() => close(false)}
            className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            aria-label="Close dialog"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="mb-8 space-y-2">
          <div className="flex items-center justify-center">
            <div className="rounded-full bg-destructive/10 p-4 mb-4">
              <Trash2Icon className="h-8 w-8 text-destructive" />
            </div>
          </div>
          <strong>
            <h2 className="text-center text-xl font-semibold text-foreground">
              Are You Sure?
            </h2>
          </strong>
          <p className="text-center text-sm text-muted-foreground">
            This action cannot be undone. This expense will be permanently
            deleted.
          </p>
        </div>

        {/* Footer */}
        <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <Button
            variant="outline"
            onClick={() => close(false)}
            className="w-full sm:w-auto gap-2"
          >
            <Shield className="h-4 w-4" />
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={() => {
              del();
              close(false);
            }}
            className="w-full sm:w-auto gap-2"
          >
            <Trash2Icon className="h-4 w-4" />
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}
