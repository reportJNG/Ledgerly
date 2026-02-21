"use client";
import { LayoutDashboard, LogIn } from "lucide-react";
import { ThemeToggle } from "../components/Myui/Themetoggle";
import { Button } from "../components/ui/button";
import { useRouter } from "next/navigation";

export default function Login() {
  const routes = useRouter();

  return (
    <div>
      <header className="flex items-center justify-between px-6 py-4 border-b">
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            onClick={() => routes.push("/")}
            className="gap-2 cursor-pointer"
          >
            <LogIn className="h-4 w-4" />
            <span className="hidden sm:inline-block">Sign Up</span>
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <LayoutDashboard className="h-6 w-6 text-primary" />
          <span className="font-semibold text-lg hidden sm:inline-block">
            Ledgerly
          </span>{" "}
          <ThemeToggle />
        </div>
      </header>
    </div>
  );
}
