"use client";

import { LayoutDashboard } from "lucide-react";
import { ThemeToggle } from "../components/Myui/Themetoggle";

export default function Singup() {
  return (
    <div>
      <header>
        {/**left */}
        <div>
          <LayoutDashboard />
        </div>

        {/**right */}
        <div>
          <ThemeToggle />
        </div>
      </header>
    </div>
  );
}
