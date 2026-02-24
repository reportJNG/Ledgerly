"use client";
import {
  LayoutDashboard,
  Home,
  UserCircle2Icon,
  BriefcaseBusinessIcon,
  BarChart3,
  Github,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

export default function About() {
  const routes = useRouter();

  const navigationItems = [
    { label: "Home", icon: Home, path: "/Home", aria: "Navigate to Home" },
    {
      label: "Profile",
      icon: UserCircle2Icon,
      path: "/Profile",
      aria: "Navigate to Profile",
    },
    {
      label: "Management",
      icon: BriefcaseBusinessIcon,
      path: "/Management",
      aria: "Navigate to Management",
    },
    {
      label: "Dashboard",
      icon: BarChart3,
      path: "/Dashboard",
      aria: "Navigate to Dashboard",
    },
  ];

  return (
    <footer className="w-full border-t border-border/40 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1 space-y-4">
            <div className="flex items-center gap-2">
              <LayoutDashboard className="h-6 w-6 text-primary" />
              <span className="font-semibold text-xl bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                Ledgerly
              </span>
            </div>
            <p className="text-sm text-muted-foreground max-w-xs">
              Streamline your business management with our intuitive dashboard.
              Track, analyze, and grow your operations efficiently.
            </p>
          </div>

          <div className="col-span-1 md:col-span-2">
            <h3 className="font-semibold text-sm mb-4">Quick Links</h3>
            <div className="grid grid-cols-2 gap-4">
              {navigationItems.map((item) => (
                <Button
                  key={item.path}
                  variant="ghost"
                  className="justify-start h-auto p-2 hover:bg-primary/10 hover:text-primary transition-all duration-200 cursor-pointer"
                  onClick={() => routes.push(item.path)}
                  aria-label={item.aria}
                >
                  <item.icon className="h-4 w-4 mr-2" />
                  <span className="text-sm">{item.label}</span>
                </Button>
              ))}
            </div>
          </div>

          <div className="col-span-1 space-y-4">
            <h3 className="font-semibold text-sm mb-4">Connect With Us</h3>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                className="rounded-full hover:bg-primary/10 hover:text-primary hover:border-primary transition-all duration-200 cursor-pointer"
                aria-label="GitHub"
                title="GitHub"
                onClick={() =>
                  window.open("https://github.com/reportJNG", "_blank")
                }
              >
                <Github className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-border/40 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground order-2 sm:order-1">
            © 2026 Ledgerly All rights reserved
          </p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground order-1 sm:order-2">
            <Button
              variant="link"
              className="h-auto p-0 text-muted-foreground hover:text-primary"
            >
              Privacy Policy
            </Button>
            <Button
              variant="link"
              className="h-auto p-0 text-muted-foreground hover:text-primary"
            >
              Terms of Service
            </Button>
            <Button
              variant="link"
              className="h-auto p-0 text-muted-foreground hover:text-primary"
            >
              Contact
            </Button>
          </div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground order-3">
            <span>Made by Hamza Remali</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
