"use client";
import { useRouter } from "next/navigation";
import About from "../components/Myui/About";
import Topbar from "../components/Myui/Topbar";
import { Button } from "../components/ui/button";
import { Activity, Tags, BarChart3, Calendar } from "lucide-react";
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

  return (
    <div>
      <header>
        <Topbar />
      </header>
      <main>
        {/**welcome */}
        <div>
          <div>
            <h1>Welcome</h1>
            <h4>To ledgrly where ..</h4>
            <p></p>
          </div>

          <Button
            aria-label="Start"
            title="Start"
            size="lg"
            onClick={() => routes.push("/Mangement")}
          >
            Start management !
          </Button>
        </div>

        {/**Main */}

        <div>
          {/**small squares */}
          {features.map((val, i) => {
            const Icon = val.icon;
            return (
              <div key={i}>
                <div>
                  <Icon />
                </div>
                <strong>{val.title}</strong>
                <p>{val.description}</p>
              </div>
            );
          })}
        </div>
      </main>
      <footer>
        <About />
      </footer>
    </div>
  );
}
