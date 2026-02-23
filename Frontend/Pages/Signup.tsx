"use client";
import { useRouter } from "next/navigation";
import { LayoutDashboard, LogIn } from "lucide-react";
import { ThemeToggle } from "../components/Myui/Themetoggle";
import { Button } from "../components/ui/button";
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
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../components/ui/form";
import { useForm } from "react-hook-form";
import { Input } from "../components/ui/input";
import { SignupSchema, SingupType } from "../Schemas/Signup";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { SignupAction } from "@/Backend/Server/SignupAction";

export default function Singup() {
  const routes = useRouter();
  const METHODS = useForm<SingupType>({
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      email: "",
      name: "",
      password: "",
      confirmPassword: "",
    },
  });

  const handlesubmitting = async (data: SingupType) => {
    if (!data) {
      toast.error("Failed Data");
    } else {
      const result = await SignupAction(data);
      if (result?.error) {
        toast.error(result.error);
      } else if (result.success) {
        toast.success(result.success);
        METHODS.reset();
        setTimeout(() => {
          routes.push("/Home");
        }, 3000);
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
            onClick={() => routes.push("/Login")}
            className="gap-2 cursor-pointer"
          >
            <LogIn className="h-4 w-4" />
            <span className="hidden sm:inline-block">Login</span>
          </Button>
        </div>
      </header>

      <main className="flex items-center justify-center p-4 md:p-6">
        <Card className="w-full max-w-md mx-auto">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Create an account</CardTitle>
            <CardDescription>
              Sign up to start managing your finances
            </CardDescription>
          </CardHeader>

          <CardContent>
            <Form {...METHODS}>
              <form
                onSubmit={METHODS.handleSubmit(handlesubmitting)}
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
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your full name"
                          className="h-11"
                          {...field}
                          onChange={(e) => {
                            e.target.value = e.target.value.replace(
                              /[^a-zA-Z0-9]/g,
                              "",
                            );
                            field.onChange(e);
                          }}
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
                          placeholder="Create a password"
                          className="h-11"
                          {...field}
                          onChange={(e) => {
                            e.target.value = e.target.value.replace(
                              /[^a-zA-Z0-9]/g,
                              "",
                            );
                            field.onChange(e);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={METHODS.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Confirm your password"
                          className="h-11"
                          {...field}
                          onChange={(e) => {
                            e.target.value = e.target.value.replace(
                              /[^a-zA-Z0-9]/g,
                              "",
                            );
                            field.onChange(e);
                          }}
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
                  Sign Up
                </Button>
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
