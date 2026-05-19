import { Shield, Trash2Icon, X } from "lucide-react";
import { Button } from "../ui/button";

interface deleteprops {
  close: React.Dispatch<React.SetStateAction<boolean>>;
  del: () => void;
}

export default function Delete({ close, del }: deleteprops) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={() => close(false)}
    >
      <div
        className="relative w-full max-w-sm mx-4 rounded-xl border border-border bg-card p-6 shadow-2xl animate-in zoom-in-95 fade-in-0 slide-in-from-bottom-2 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={() => close(false)}
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>

        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="rounded-full bg-destructive/15 p-3 ring-8 ring-destructive/10">
            <Trash2Icon className="h-6 w-6 text-destructive" />
          </div>
        </div>

        {/* Content */}
        <div className="text-center space-y-2 mb-6">
          <h2 className="text-lg font-semibold text-foreground">
            Are you absolutely sure?
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            This action cannot be undone. This will permanently delete this
            expense and remove the data from our servers.
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={() => close(false)}
            className="flex-1 gap-2 border-border hover:bg-secondary hover:text-secondary-foreground"
          >
            <Shield className="h-4 w-4" />
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={() => del()}
            className="flex-1 gap-2 bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            <Trash2Icon className="h-4 w-4" />
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}
