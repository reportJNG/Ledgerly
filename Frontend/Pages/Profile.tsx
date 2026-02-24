"use client";

import { useEffect, useState } from "react";
import Topbar from "@/Frontend/components/Myui/Topbar";
import About from "@/Frontend/components/Myui/About";
import { UserCircle2Icon } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { GetInfoUser } from "@/Backend/Server/GetInfoUser";
import { users } from "@/lib/generated/prisma";
import { Button } from "../components/ui/button";
import Settings from "../components/Myui/Settings";
import Terms from "../components/Myui/Terms";

export default function Profile() {
  const [settings, setSettings] = useState<boolean>(false);
  const [terms, setTerms] = useState<boolean>(false);
  const [userdata, setUserdata] = useState<users>({
    email: "",
    id: "",
    created_at: null,
    name: "",
    password: "",
  });
  useEffect(() => {
    const getdata = async () => {
      const result = await GetInfoUser();
      if (result.success) {
        setUserdata(result.success);
      }
    };
    getdata();
  }, []);
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="border-b border-border">
        <Topbar
          closeSettings={() => setSettings((prev) => !prev)}
          closeTerms={() => setTerms((prev) => !prev)}
          active="Profile"
        />
      </header>

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/3">
            <div className="flex justify-center md:justify-start">
              <div className="w-100 h-100 rounded-full bg-muted flex items-center justify-center border-4 border-primary/10">
                <UserCircle2Icon className="w-32 h-32 text-muted-foreground" />
              </div>
            </div>
          </div>

          <div className="md:w-2/3">
            <div className="w-full max-w-2xl">
              <Card className="shadow-lg border-border/50">
                <CardHeader className="border-b border-border/50 pb-4">
                  <CardTitle className="text-2xl font-semibold text-foreground">
                    User Information
                  </CardTitle>
                </CardHeader>

                <CardContent className="space-y-4 pt-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">
                      Email
                    </label>
                    <input
                      type="text"
                      disabled
                      value={userdata?.email}
                      className="w-full px-4 py-2 rounded-md bg-muted/50 border border-input text-foreground disabled:opacity-70 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-colors"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">
                      Name
                    </label>
                    <input
                      type="text"
                      disabled
                      value={userdata?.name ?? ""}
                      className="w-full px-4 py-2 rounded-md bg-muted/50 border border-input text-foreground disabled:opacity-70 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-colors"
                    />
                  </div>
                </CardContent>

                <CardDescription className="border-t border-border/50 pt-4 pb-6 px-6">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                      aria-label="Reset Password"
                      title="Reset Password"
                      className="flex-1 bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors cursor-pointer"
                    >
                      Reset Password
                    </Button>

                    <Button
                      aria-label="Edit Profile"
                      title="Edit Profile"
                      className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors cursor-pointer"
                    >
                      Edit Profile
                    </Button>
                  </div>
                </CardDescription>
              </Card>
            </div>
          </div>
        </div>
        {settings && <Settings close={() => setSettings((prev) => !prev)} />}
        {terms && <Terms close={() => setTerms((prev) => !prev)} />}
      </main>

      <footer className="border-t border-border mt-auto">
        <About />
      </footer>
    </div>
  );
}
