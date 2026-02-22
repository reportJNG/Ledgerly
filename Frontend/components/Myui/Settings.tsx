import { X } from "lucide-react";
import { Button } from "@/Frontend/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { toast } from "sonner";

interface Settingsprops {
  close: () => void;
}

export default function Settings({ close }: Settingsprops) {
  const { theme, setTheme } = useTheme();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-auto rounded-xl border border-border bg-card shadow-2xl">
        <div className="sticky top-0 z-10 flex justify-between items-center p-6 border-b border-border bg-card">
          <h2 className="text-2xl font-semibold text-foreground">Settings</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={close}
            className="rounded-full hover:bg-muted transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        <div className="p-6 space-y-8">
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium text-foreground mb-1">
                Theme
              </h3>
              <p className="text-sm text-muted-foreground">
                Select your preferred color theme
              </p>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={() => setTheme("light")}
                className={`flex-1 flex flex-col items-center gap-3 p-4 rounded-lg border-2 transition-all cursor-pointer ${
                  theme === "light"
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50 hover:bg-accent/50"
                }`}
              >
                <div className="w-full h-24 rounded-md bg-linear-to-br from-amber-100 to-amber-200 flex items-center justify-center">
                  <Sun
                    className={`w-8 h-8 ${
                      theme === "light" ? "text-amber-600" : "text-amber-500"
                    }`}
                  />
                </div>
                <span
                  className={`font-medium ${
                    theme === "light" ? "text-primary" : "text-foreground"
                  }`}
                >
                  Light
                </span>
                {theme === "light" && (
                  <span className="text-xs text-primary">Active</span>
                )}
              </button>

              <button
                onClick={() => setTheme("dark")}
                className={`flex-1 flex flex-col items-center gap-3 p-4 rounded-lg border-2 transition-all cursor-pointer ${
                  theme === "dark"
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50 hover:bg-accent/50"
                }`}
              >
                <div className="w-full h-24 rounded-md bg-linear-to-br from-slate-700 to-slate-900 flex items-center justify-center">
                  <Moon
                    className={`w-8 h-8 ${
                      theme === "dark" ? "text-blue-400" : "text-blue-300"
                    }`}
                  />
                </div>
                <span
                  className={`font-medium ${
                    theme === "dark" ? "text-primary" : "text-foreground"
                  }`}
                >
                  Dark
                </span>
                {theme === "dark" && (
                  <span className="text-xs text-primary">Active</span>
                )}
              </button>
            </div>
          </div>
        </div>

        <div className="sticky bottom-0 flex justify-end gap-3 p-6 border-t border-border bg-card">
          <Button
            onClick={close}
            variant="outline"
            className="min-w-24 cursor-pointer"
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              toast.success("Save Successfully");
              close();
            }}
            variant="default"
            className="min-w-24 cursor-pointer"
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}
