"use client";
import { LayoutDashboard, LogIn } from "lucide-react";
import { ThemeToggle } from "../components/Myui/Themetoggle";
import { Button } from "../components/ui/button";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";

export default function Login() {
  const routes = useRouter();

  return (
    <div>
      <header className="flex items-center justify-between px-6 py-4 border-b">
        <div className="flex items-center gap-2">
          <LayoutDashboard className="h-6 w-6 text-primary" />
          <span className="font-semibold text-lg hidden sm:inline-block">
            Ledgerly
          </span>
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Button
            variant="outline"
            onClick={() => routes.push("/")}
            className="gap-2 cursor-pointer"
          >
            <LogIn className="h-4 w-4" />
            <span className="hidden sm:inline-block">Sign Up</span>
          </Button>
        </div>
      </header>
      <main>
        <Card>
          <CardHeader>
            <CardTitle>Login with account</CardTitle>
            <CardDescription>
              {" "}
              Login to start managing your finances
            </CardDescription>
          </CardHeader>

          <CardContent></CardContent>

          <div className="flex justify-center items-center gap-50 w-full">
            <button
              onClick={() => routes.push("/Login")}
              className="text-xs text-muted-foreground hover:text-primary transition-colors cursor-pointer"
              aria-label="Login"
              title="Login"
            >
              Already have an account?
            </button>
            <button
              className="text-xs text-muted-foreground hover:text-primary transition-colors cursor-pointer"
              aria-label="Help"
              title="Help"
              onClick={() =>
                window.open("https://remalihamza.vercel.app/", "_blank")
              }
            >
              Need help?
            </button>
          </div>

          <CardDescription></CardDescription>
        </Card>
      </main>
    </div>
  );
}
