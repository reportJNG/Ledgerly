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
import { LoginAction } from "@/Backend/Server/LoginAcion";

export default function Login() {
  const { ...METHODS } = useForm<LoginType>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const routes = useRouter();

  const handlesubmitlogin = async (data: LoginType) => {
    const result = await LoginAction(data);
    if (!result) {
      toast.error("Failed to fetch");
    }
    if (result.error) {
      toast.error(result.error);
    } else {
      if (result.success) {
        toast.success(result.success);
        METHODS.reset();
        routes.push("/Home");
      }
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="flex items-center justify-between px-6 py-4 border-b">
        <div className="flex items-center gap-2">
          <LayoutDashboard className="h-6 w-6 text-primary" />
          <span className="font-semibold text-lg hidden sm:inline-block bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent">
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

      <main className="flex items-center justify-center p-4 md:p-6">
        <Card className="w-full max-w-md mx-auto">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Welcome back</CardTitle>
            <CardDescription>
              Login to continue managing your finances
            </CardDescription>
          </CardHeader>

          <CardContent>
            <Form {...METHODS}>
              <form
                onSubmit={METHODS.handleSubmit(handlesubmitlogin)}
                className="space-y-4"
              >
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
                          className="h-11"
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
                          placeholder="Enter your password"
                          className="h-11"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full h-11 mt-6 cursor-pointer"
                >
                  Login
                </Button>
              </form>
            </Form>
          </CardContent>

          <div className="flex justify-center items-center gap-32 w-full px-6">
            <button
              onClick={() => routes.push("/")}
              className="text-xs text-muted-foreground hover:text-primary transition-colors cursor-pointer"
              aria-label="Sign up"
              title="Sign up"
            >
              Dont have an account?
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
              <p className="text-xs text-muted-foreground text-center w-full">
                By logging in, you agree to our{" "}
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
