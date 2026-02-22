"use client";
import { LayoutDashboard, LogIn } from "lucide-react";
import { ThemeToggle } from "../components/Myui/Themetoggle";
import { Button } from "../components/ui/button";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/form";
import { useForm } from "react-hook-form";
import { LoginSchema, LoginType } from "../Schemas/Login";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../components/ui/input";
import { toast } from "sonner";

export default function Login() {
  const { ...METHODS } = useForm<LoginType>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const routes = useRouter();

  const handlesubmitlogin = () => {
    METHODS.reset();
    toast.success("yes");
  };

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

          <CardContent>
            <Form {...METHODS}>
              <form onSubmit={METHODS.handleSubmit(handlesubmitlogin)}>
                <FormField
                  control={METHODS.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="Enter your email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={METHODS.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Enter a password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                ></FormField>
                <Button type="submit">Login</Button>
              </form>
            </Form>
          </CardContent>

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

          <CardFooter className="flex flex-col gap-4">
            <div className="flex items-center justify-between w-full text-sm border-t pt-4">
              <p className="text-xs text-muted-foreground text-center">
                By creating an account, you agree to our{" "}
                <button className="text-primary hover:underline cursor-pointer">
                  Terms of Service
                </button>{" "}
                and{" "}
                <button className="text-primary hover:underline cursor-pointer">
                  Privacy Policy
                </button>
              </p>
            </div>
          </CardFooter>
        </Card>
      </main>
    </div>
  );
}
