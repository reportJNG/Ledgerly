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
import {
  Search,
  Wallet,
  HandCoins,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
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

export default function Dashboard() {
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

  const [info, setInfo] = useState<{
    profit: number;
    moins: number;
    plus: number;
  }>({
    profit: 0,
    moins: 0,
    plus: 0,
  });

  const [selectoption, setSelectoption] = useState<{
    date: "1d" | "3d" | "7d" | "1m";
    type: "income" | "expense";
  }>({
    date: "1d",
    type: "income",
  });

  useEffect(() => {
    const call = async () => {
      const data = await Getreprot(selectoption.date, user.id);
      setInfo((prev) => ({
        ...prev,
        plus: Number(data?.data?.all) || 0,
        moins: Number(data?.data?.loss) || 0,
        profit: Number(data?.data?.profit) || 0,
      }));
    };
    call();
  }, [selectoption, user.id]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <Topbar
          closeSettings={() => setSettings((prev) => !prev)}
          closeTerms={() => setTerms((prev) => !prev)}
          active="Dashboard"
        />
      </header>

      {/* Main Content */}
      <main className="container mx-auto max-w-6xl px-4 py-8">
        <div className="space-y-8">
          {/* Top Section - Header & Filter */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground tracking-tight">
                Dashboard
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                Overview of your financial activity
              </p>
            </div>
            <div className="w-full sm:w-[180px]">
              <Select
                value={selectoption.date}
                onValueChange={(value) =>
                  setSelectoption((prev) => ({
                    ...prev,
                    date: value as "1d" | "3d" | "7d" | "1m",
                  }))
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1d">
                    <span className="font-medium">Today</span>
                  </SelectItem>
                  <SelectItem value="3d">
                    <span className="font-medium">Last 3 Days</span>
                  </SelectItem>
                  <SelectItem value="7d">
                    <span className="font-medium">Last Week</span>
                  </SelectItem>
                  <SelectItem value="1m">
                    <span className="font-medium">Last Month</span>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {/* Revenue Card */}
            <Card className="border-border bg-card hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total Revenue
                </CardTitle>
                <div className="rounded-lg bg-emerald-500/10 p-2">
                  <HandCoins className="h-4 w-4 text-emerald-500 dark:text-emerald-400" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                    ${info.plus.toFixed(2)}
                  </div>
                  <TrendingUp className="h-4 w-4 text-emerald-500" />
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  +{((info.plus / (info.profit || 1)) * 100).toFixed(1)}% of
                  profit
                </p>
              </CardContent>
            </Card>

            {/* Lost Card */}
            <Card className="border-border bg-card hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total Expenses
                </CardTitle>
                <div className="rounded-lg bg-red-500/10 p-2">
                  <TrendingDown className="h-4 w-4 text-red-500 dark:text-red-400" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                    ${info.moins.toFixed(2)}
                  </div>
                  <TrendingDown className="h-4 w-4 text-red-500" />
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  -{((info.moins / (info.plus || 1)) * 100).toFixed(1)}% of
                  revenue
                </p>
              </CardContent>
            </Card>

            {/* Profit Card */}
            <Card className="border-border bg-card hover:shadow-md transition-shadow sm:col-span-2 lg:col-span-1">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Net Profit
                </CardTitle>
                <div className="rounded-lg bg-primary/10 p-2">
                  <Wallet className="h-4 w-4 text-primary" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <div
                    className={`text-2xl font-bold ${
                      info.profit >= 0
                        ? "text-emerald-600 dark:text-emerald-400"
                        : "text-red-600 dark:text-red-400"
                    }`}
                  >
                    ${info.profit.toFixed(2)}
                  </div>
                  {info.profit >= 0 ? (
                    <TrendingUp className="h-4 w-4 text-emerald-500" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-red-500" />
                  )}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {info.profit >= 0 ? "Net positive" : "Net negative"} for this
                  period
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-8">
        <About />
      </footer>

      {/* Modals */}
      {settings && <Settings close={() => setSettings(false)} />}
      {terms && <Terms close={() => setTerms(false)} />}
    </div>
  );
}
