"use client";
import {
  BarChart3,
  BriefcaseBusinessIcon,
  FileText,
  HelpCircle,
  Home,
  LayoutDashboard,
  LogOut,
  Settings,
  UserCircle2Icon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { ThemeToggle } from "./Themetoggle";

interface Topbarprops {
  closeSettings: () => void;
  closeTerms: () => void;
  active: string;
}

export default function Topbar({
  closeSettings,
  closeTerms,
  active,
}: Topbarprops) {
  const routes = useRouter();
  const handleNavigation = (path: string) => {
    routes.push(path);
  };
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="w-full px-4 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10">
              <LayoutDashboard className="h-5 w-5 text-primary" />
            </div>
            <span className="font-bold text-xl hidden sm:inline-block bg-linear-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
              Ledgerly
            </span>
          </div>

          <div className="flex items-center gap-1 lg:gap-2">
            <Button
              variant="ghost"
              size="icon"
              aria-label="Home"
              title="Home"
              onClick={() => handleNavigation("/Home")}
              className={`relative hover:bg-primary/10 hover:text-primary transition-all duration-200 cursor-pointer ${
                active === "Home" ? "text-primary bg-primary/10" : ""
              }`}
            >
              <Home className="h-5 w-5" />
              {active === "Home" && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary" />
              )}
            </Button>

            <Button
              variant="ghost"
              size="icon"
              aria-label="Profile"
              title="Profile"
              onClick={() => handleNavigation("/Profile")}
              className={`relative hover:bg-primary/10 hover:text-primary transition-all duration-200 cursor-pointer ${
                active === "Profile" ? "text-primary bg-primary/10" : ""
              }`}
            >
              <UserCircle2Icon className="h-5 w-5" />
              {active === "Profile" && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary" />
              )}
            </Button>

            <Button
              variant="ghost"
              size="icon"
              aria-label="Management"
              title="Management"
              onClick={() => handleNavigation("/Management")}
              className={`relative hover:bg-primary/10 hover:text-primary transition-all duration-200 cursor-pointer ${
                active === "Management" ? "text-primary bg-primary/10" : ""
              }`}
            >
              <BriefcaseBusinessIcon className="h-5 w-5" />
              {active === "Management" && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary" />
              )}
            </Button>

            <Button
              variant="ghost"
              size="icon"
              aria-label="Dashboard"
              title="Dashboard"
              onClick={() => handleNavigation("/Dashboard")}
              className={`relative hover:bg-primary/10 hover:text-primary transition-all duration-200 cursor-pointer ${
                active === "Dashboard" ? "text-primary bg-primary/10" : ""
              }`}
            >
              <BarChart3 className="h-5 w-5" />
              {active === "Dashboard" && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary" />
              )}
            </Button>

            <div className="h-8 w-px bg-border/60 mx-2 hidden sm:block" />

            <div className="flex items-center gap-1 lg:gap-2">
              <Button
                variant="ghost"
                size="icon"
                aria-label="Settings"
                title="Settings"
                className="relative hover:bg-primary/10 hover:text-primary transition-all duration-200 cursor-pointer"
                onClick={closeSettings}
              >
                <Settings className="h-5 w-5" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                aria-label="Terms"
                title="Terms"
                className="relative hover:bg-primary/10 hover:text-primary transition-all duration-200 cursor-pointer"
                onClick={closeTerms}
              >
                <FileText className="h-5 w-5" />
              </Button>

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
            </div>

            <div className="h-8 w-px bg-border/60 mx-2 hidden sm:block" />

            <div className="flex items-center gap-1 lg:gap-2">
              <ThemeToggle />

              <Button
                variant="ghost"
                size="icon"
                aria-label="Log out"
                title="Log out"
                onClick={() => routes.push("/Login")}
                className="relative hover:bg-destructive/10 hover:text-destructive transition-all duration-200 cursor-pointer group"
              >
                <LogOut className="h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-1px bg-linear-to-r from-transparent via-primary/20 to-transparent" />
    </header>
  );
}
