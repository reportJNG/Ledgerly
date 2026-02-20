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

export default function Singup() {
  const routes = useRouter();
  const form = useForm();
  const handlesubmitting = () => {};

  return (
    <div className="min-h-screen bg-background">
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
            onClick={() => routes.push("/Login")}
            className="gap-2"
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
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handlesubmitting)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
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
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your full name"
                          className="h-11"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
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
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
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
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full h-11 mt-6">
                  Sign Up
                </Button>
              </form>
            </Form>
          </CardContent>

          <CardFooter className="flex flex-col gap-4">
            {/* Terms */}
            <p className="text-xs text-muted-foreground text-center">
              By creating an account, you agree to our{" "}
              <button className="text-primary hover:underline">
                Terms of Service
              </button>{" "}
              and{" "}
              <button className="text-primary hover:underline">
                Privacy Policy
              </button>
            </p>

            {/* Footer Links */}
            <div className="flex items-center justify-between w-full text-sm border-t pt-4">
              <button
                onClick={() => routes.push("/Login")}
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Already have an account?
              </button>
              <button className="text-muted-foreground hover:text-primary transition-colors">
                Need help?
              </button>
            </div>
          </CardFooter>
        </Card>
      </main>
    </div>
  );
}
