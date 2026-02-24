"use client";

import { useState } from "react";
import Topbar from "@/Frontend/components/Myui/Topbar";
import About from "@/Frontend/components/Myui/About";
import { UserCircle2Icon } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";

export default function Profile() {
  const [settings, setSettings] = useState<boolean>(false);
  const [terms, setTerms] = useState<boolean>(false);

  return (
    <div>
      <header>
        <Topbar
          closeSettings={() => setSettings((prev) => !prev)}
          closeTerms={() => setTerms((prev) => !prev)}
        />
      </header>
      <div>
        {/** big ui profile user left  */}
        <div>
          <div>
            <UserCircle2Icon />
          </div>
        </div>

        {/**right side */}
        <div>
          {/** empty input Ui */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>User Information</CardTitle>
              </CardHeader>
              <CardContent>
                <input type="text" disabled />
                <input type="text" disabled />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <footer>
        <About />
      </footer>
    </div>
  );
}
