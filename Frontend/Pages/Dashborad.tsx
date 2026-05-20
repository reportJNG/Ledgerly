"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { TokenChecker } from "@/Backend/Server/TokenChecker";
import Topbar from "../components/Myui/Topbar";
import About from "../components/Myui/About";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import {
  CirclePlus,
  CircleMinus,
  Search,
  Wallet,
  HandCoins,
  TrendingDown,
} from "lucide-react";
import { Button } from "../components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
export default function Dashborad() {
  const routes = useRouter();
  const [settings, setSettings] = useState<boolean>(false);
  const [terms, setTerms] = useState<boolean>(false);
  useEffect(() => {
    const check = async () => {
      const testusers = await TokenChecker();
      if (testusers?.error) {
        routes.push("/");
      }
    };
    check();
  }, [routes]);

  //select options
  const [selectoption, setSelectoption] = useState<{
    date: string;
    type: "income" | "expense";
  }>({
    date: "1d",
    type: "income",
  });

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
                date: value,
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
              <SelectItem value="7w" title="7 days">
                <strong>7 J</strong>
              </SelectItem>
              <SelectItem value="1m" title="1 month">
                <strong>1 M</strong>
              </SelectItem>
            </SelectContent>
          </Select>
          <Select
            value={selectoption.type}
            onValueChange={(value) =>
              setSelectoption((prev) => ({
                ...prev,
                type: value as "income" | "expense",
              }))
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="income" title="income">
                <strong>income</strong>
                <CirclePlus />
              </SelectItem>
              <SelectItem value="expense" title="expense">
                <strong>expense</strong>
                <CircleMinus />
              </SelectItem>
            </SelectContent>
          </Select>
          <Button title="click to search">
            <strong>Search</strong>
            <Search />
          </Button>
        </div>
        {/**body 3 cards */}

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Revenu</CardTitle>
            </CardHeader>

            <CardContent>
              <div>
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
    </>
  );
}
