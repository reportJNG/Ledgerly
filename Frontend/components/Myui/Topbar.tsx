"use client";
import {
  BarChart3,
  BriefcaseBusinessIcon,
  HelpCircle,
  Home,
  LayoutDashboard,
  LogOut,
  UserCircle2Icon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { ThemeToggle } from "./Themetoggle";

export default function Topbar() {
  const routes = useRouter();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-2">
          <LayoutDashboard className="h-6 w-6 text-primary" />
          <span className="font-semibold text-lg hidden sm:inline-block bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Ledgerly
          </span>
        </div>

        <div className="flex items-center gap-1 md:gap-2">
          <Button
            variant="ghost"
            size="icon"
            aria-label="Home"
            title="Home"
            onClick={() => routes.push("/Home")}
            className="relative hover:bg-primary/10 hover:text-primary transition-all duration-200 cursor-pointer"
          >
            <Home className="h-5 w-5" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            aria-label="Profile"
            title="Profile"
            onClick={() => routes.push("/Profile")}
            className="relative hover:bg-primary/10 hover:text-primary transition-all duration-200 cursor-pointer"
          >
            <UserCircle2Icon className="h-5 w-5" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            aria-label="Management"
            title="Management"
            onClick={() => routes.push("/Management")}
            className="relative hover:bg-primary/10 hover:text-primary transition-all duration-200 cursor-pointer"
          >
            <BriefcaseBusinessIcon className="h-5 w-5" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            aria-label="Dashboard"
            title="Dashboard"
            onClick={() => routes.push("/Dashboard")}
            className="relative hover:bg-primary/10 hover:text-primary transition-all duration-200 cursor-pointer"
          >
            <BarChart3 className="h-5 w-5" />
          </Button>

          <div className="h-6 w-px bg-border mx-1 hidden sm:block" />
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            aria-label="Help"
            title="Help"
            onClick={() =>
              window.open("https://remalihamza.vercel.app/", "_blank")
            }
            className="relative hover:bg-primary/10 hover:text-primary transition-all duration-200 cursor-pointer"
          >
            <HelpCircle className="h-5 w-5" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            aria-label="Log out"
            title="Log out"
            onClick={() => routes.push("/Login")}
            className="relative hover:bg-destructive/10 hover:text-destructive transition-all duration-200 cursor-pointer"
          >
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}
