"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Topbar from "../components/Myui/Topbar";
import About from "../components/Myui/About";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Search, Wallet, HandCoins, TrendingDown } from "lucide-react";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Getreprot } from "@/Backend/Server/GetReport";
import { users } from "@/lib/generated/prisma";
import { GetInfoUser } from "@/Backend/Server/GetInfoUser";
import Settings from "../components/Myui/Settings";
import Terms from "../components/Myui/Terms";
export default function Dashborad() {
  const routes = useRouter();
  const [settings, setSettings] = useState<boolean>(false);
  const [terms, setTerms] = useState<boolean>(false);
  const [user, setUser] = useState<users>({
    id: "",
    name: "",
    email: "",
    password: "",
    created_at: null,
  });
  useEffect(() => {
    const call = async () => {
      const result = await GetInfoUser();
      if (result.error) {
        routes.push("/");
      }
      if (result.success) setUser(result.success);
    };
    call();
  }, [routes]);

  //pre loaded data

  const [info, setInfo] = useState<{
    profit: number;
    moins: number;
    plus: number;
  }>({
    profit: 0,
    moins: 0,
    plus: 0,
  });

  //select options
  const [selectoption, setSelectoption] = useState<{
    date: "1d" | "3d" | "7d" | "1m";
    type: "income" | "expense";
  }>({
    date: "1d",
    type: "income",
  });

  //here to grab data

  useEffect(() => {
    const call = async () => {
      const data = await Getreprot(selectoption.date, user.id);

      setInfo((prev) => ({
        ...prev,
        plus: Number(data?.data?.all),
        moins: Number(data?.data?.loss),
        profit: Number(data?.data?.profit),
      }));
    };
    call();
  }, [selectoption, user.id]);

  return (
    <>
      <header>
        <Topbar
          closeSettings={() => setSettings((prev) => !prev)}
          closeTerms={() => setTerms((prev) => !prev)}
          active="Dashboard"
        />
      </header>
      <div>
        {/**top */}
        <div>
          <Select
            value={selectoption.date}
            onValueChange={(value) =>
              setSelectoption((prev) => ({
                ...prev,
                date: value as "1d" | "3d" | "7d" | "1m",
              }))
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Date" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="1d" title="1 day">
                <strong>1 D</strong>
              </SelectItem>
              <SelectItem value="3d" title="3 days">
                <strong>3 D</strong>
              </SelectItem>
              <SelectItem value="7d" title="7 days">
                <strong>7 J</strong>
              </SelectItem>
              <SelectItem value="1m" title="1 month">
                <strong>1 M</strong>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        {/**body 3 cards */}

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Revenu</CardTitle>
            </CardHeader>

            <CardContent>
              <div>
                <div>
                  <strong>{info.plus || 0}</strong>
                </div>
                <HandCoins />
              </div>
            </CardContent>

            <CardFooter>
              <CardDescription></CardDescription>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Lost</CardTitle>
            </CardHeader>

            <CardContent>
              <div>
                <div>
                  <strong>{info.moins || 0}</strong>
                </div>
                <TrendingDown />
              </div>
            </CardContent>

            <CardFooter>
              <CardDescription></CardDescription>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Profit</CardTitle>
            </CardHeader>

            <CardContent>
              <div>
                <div>
                  <strong>{info.profit || 0}</strong>
                </div>
                <Wallet />
              </div>
            </CardContent>

            <CardFooter>
              <CardDescription></CardDescription>
            </CardFooter>
          </Card>
        </div>
        {/**table */}
        <div></div>
      </div>
      <footer>
        <About />
      </footer>
      {/* Modals */}
      {settings && <Settings close={() => setSettings(false)} />}
      {terms && <Terms close={() => setTerms(false)} />}
    </>
  );
}
