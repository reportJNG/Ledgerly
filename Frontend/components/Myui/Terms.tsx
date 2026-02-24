import { X, Activity, Tags, BarChart3, Shield } from "lucide-react";
import { Button } from "@/Frontend/components/ui/button";
import { Card, CardContent } from "@/Frontend/components/ui/card";

interface TermsProps {
  close: () => void;
}

export default function Terms({ close }: TermsProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-auto rounded-xl bg-card shadow-2xl">
        <div className="sticky top-0 z-10 flex justify-between items-center p-4 border-b bg-card/95 backdrop-blur supports-backdrop-filter:bg-card/75">
          <h2 className="text-xl font-semibold text-foreground">
            About This Application
          </h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={close}
            className="rounded-full hover:bg-muted transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        <div className="p-6 space-y-6">
          <Card className="border-0 shadow-none">
            <CardContent className="p-0 space-y-6">
              <div className="space-y-2">
                <p className="text-lg text-card-foreground leading-relaxed">
                  Hello! Im Remali Hamza
                  <button
                    onClick={() =>
                      window.open("https://remalihamza.vercel.app/", "_blank")
                    }
                    className="inline font-semibold text-primary hover:text-primary/80 hover:underline transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20 rounded px-1 cursor-pointer"
                  >
                    Remali Hamza
                  </button>
                  , a Web Developer passionate about building modern and secure
                  applications. This Personal Expense Tracker helps users
                  monitor spending, track income, and manage finances
                  efficiently.
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="flex gap-3 p-4 rounded-lg bg-muted/50 border">
                  <Activity className="w-5 h-5 text-primary shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">
                      Expense Management
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Add, edit, and delete daily expenses with a clean and
                      simple interface.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 p-4 rounded-lg bg-muted/50 border">
                  <Tags className="w-5 h-5 text-primary shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">
                      Smart Categorization
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Organize transactions into categories like Food, Rent,
                      Bills, and more.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 p-4 rounded-lg bg-muted/50 border">
                  <BarChart3 className="w-5 h-5 text-primary shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">
                      Income vs Expenses
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Compare your income and spending to clearly understand
                      your financial balance each month.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 p-4 rounded-lg bg-muted/50 border">
                  <Shield className="w-5 h-5 text-primary shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">
                      Data Privacy & Security
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Your financial information is securely stored and
                      accessible only to you.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border bg-card p-6 space-y-4">
                <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                  <span className="w-1 h-6 bg-primary rounded-full" />
                  Terms of Use
                </h3>
                <div className="text-muted-foreground text-sm">
                  <p className="mb-3">
                    By using this application, you agree to the following:
                  </p>
                  <ul className="space-y-2">
                    {[
                      "Users are responsible for entering accurate financial information.",
                      "This application does not provide financial, tax, or investment advice.",
                      "All financial data belongs solely to the user.",
                      "The developer is not responsible for financial losses or incorrect data entry.",
                      "This project is provided as-is for educational and personal budgeting purposes.",
                    ].map((term, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>{term}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="sticky bottom-0 flex justify-end p-4 border-t bg-card/95 backdrop-blur supports-backdrop-filter:bg-card/75">
          <Button
            onClick={close}
            variant="default"
            className="min-w-25 cursor-pointer"
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}
