"use client";
import { useRouter } from "next/navigation";
import About from "../components/Myui/About";
import Topbar from "../components/Myui/Topbar";
import { Button } from "../components/ui/button";
import { Activity, Tags, BarChart3, Calendar } from "lucide-react";
import { useEffect, useState } from "react";
import Terms from "../components/Myui/Terms";
import Settings from "../components/Myui/Settings";
import { TokenChecker } from "@/Backend/Server/TokenChecker";

export const features = [
  {
    title: "Real-Time Expense Tracking",
    description:
      "Instantly log and monitor your spending with a smooth and responsive system.",
    icon: Activity,
  },
  {
    title: "Advanced Categorization",
    description:
      "Structure your finances with customizable expense categories.",
    icon: Tags,
  },
  {
    title: "Financial Insights",
    description:
      "Analyze income and expenses to understand your financial health.",
    icon: BarChart3,
  },
  {
    title: "Monthly Analytics",
    description: "Detailed monthly summaries to help you control your budget.",
    icon: Calendar,
  },
];

export default function Home() {
  const routes = useRouter();

  useEffect(() => {
    const check = async () => {
      const testusers = await TokenChecker();
      if (testusers?.error) {
        routes.push("/");
      }
    };
    check();
  }, [routes]);

  const [settings, setSettings] = useState<boolean>(false);
  const [terms, setTerms] = useState<boolean>(false);

  return (
    <div className="min-h-screen flex flex-col">
      <header>
        <Topbar
          closeSettings={() => setSettings((prev) => !prev)}
          closeTerms={() => setTerms((prev) => !prev)}
        />
      </header>

      <main className="flex-1">
        <section className="relative overflow-hidden bg-linear-to-b from-primary/5 via-primary/5 to-background py-20 md:py-28">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-8 max-w-3xl mx-auto">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                  <span className="bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                    Welcome
                  </span>
                </h1>
                <h4 className="text-xl md:text-2xl text-muted-foreground">
                  To Ledgerly — Your Smart Financial Companion
                </h4>
                <p className="text-lg text-muted-foreground/80 max-w-2xl">
                  Take control of your finances with intelligent tracking,
                  insightful analytics, and seamless management tools.
                </p>
              </div>

              <Button
                aria-label="Start"
                title="Start"
                size="lg"
                onClick={() => routes.push("/Management")}
                className="relative group px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer"
              >
                <span className="relative z-10">Start management !</span>
                <div className="absolute inset-0 bg-linear-to-r from-primary to-primary/60 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Button>
            </div>
          </div>

          <div className="absolute inset-0 -z-10 h-full w-full bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-size-[14px_24px]" />
        </section>

        <section className="py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Powerful Features
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Everything you need to manage your finances effectively in one
                place
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {features.map((val, i) => {
                const Icon = val.icon;
                return (
                  <div
                    key={i}
                    className="group relative overflow-hidden rounded-xl border bg-card p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                      <Icon className="h-6 w-6" />
                    </div>

                    <strong className="block text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                      {val.title}
                    </strong>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {val.description}
                    </p>

                    <div className="absolute inset-0 -z-10 bg-linear-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16 bg-primary/5 border-y">
          <div className="container px-4 md:px-6 text-center">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to take control?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              Join thousands of users who have simplified their financial
              management with Ledgerly
            </p>
            <Button
              size="lg"
              variant="outline"
              onClick={() => routes.push("/Management")}
              className="hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 cursor-pointer"
            >
              Get Started Now
            </Button>
          </div>
        </section>

        {/**here to call the overlay pop-up component */}
        {terms && <Terms close={() => setTerms((prev) => !prev)} />}
        {settings && <Settings close={() => setSettings((prev) => !prev)} />}
      </main>

      <footer>
        <About />
      </footer>
    </div>
  );
}
