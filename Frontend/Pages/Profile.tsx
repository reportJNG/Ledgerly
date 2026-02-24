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
                <input type="text" disabled value={userdata?.email} />
                <input type="text" disabled value={userdata?.name ?? ""} />
              </CardContent>
              <CardDescription>
                <div>
                  <Button aria-label="Reset Password" title="Reset Password">
                    Reset Password
                  </Button>

                  <Button aria-label="Edit Profile" title="Edit Profile">
                    Edit Profile
                  </Button>
                </div>
              </CardDescription>
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
