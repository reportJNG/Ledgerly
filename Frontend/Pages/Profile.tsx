"use client";

import { useEffect, useState } from "react";
import Topbar from "@/Frontend/components/Myui/Topbar";
import About from "@/Frontend/components/Myui/About";
import { UserCircle2Icon } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { GetInfoUser } from "@/Backend/Server/GetInfoUser";
import { users } from "@/lib/generated/prisma";
import { Button } from "../components/ui/button";
import Settings from "../components/Myui/Settings";
import Terms from "../components/Myui/Terms";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/form";
import { useForm } from "react-hook-form";
import {
  UpdaterProfileSchema,
  UpdaterProfileType,
} from "../Schemas/UpdaterProfile";
import { zodResolver } from "@hookform/resolvers/zod";
import { UpdateProfileAction } from "@/Backend/Server/UpdateProfile";
import { toast } from "sonner";

export default function Profile() {
  const [settings, setSettings] = useState<boolean>(false);
  const [terms, setTerms] = useState<boolean>(false);
  const [userdata, setUserdata] = useState<users>({
    email: "",
    id: "",
    created_at: null,
    name: "",
    password: "",
  });
  useEffect(() => {
    const getdata = async () => {
      const result = await GetInfoUser();
      if (result.success) {
        setUserdata(result.success);
      }
    };
    getdata();
  }, []);

  const [editprofile, setEditProfile] = useState<boolean>(false);
  const { ...METHODS } = useForm<UpdaterProfileType>({
    resolver: zodResolver(UpdaterProfileSchema),
    defaultValues: {
      email: "",
      name: "",
    },
  });
  const buttonedithandler = () => {
    METHODS.reset();
    setEditProfile((prev) => !prev);
  };
  const UpdateProfile = async (data: UpdaterProfileType) => {
    const result = await UpdateProfileAction(userdata.id, data);
    if (result.error) {
      toast.error(result.error);
    } else {
      if (result.success) {
        toast.success(result.success);
        METHODS.reset();
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="border-b border-border">
        <Topbar
          closeSettings={() => setSettings((prev) => !prev)}
          closeTerms={() => setTerms((prev) => !prev)}
          active="Profile"
        />
      </header>

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/3">
            <div className="flex justify-center md:justify-start">
              <div className="w-100 h-100 rounded-full bg-muted flex items-center justify-center border-4 border-primary/10">
                <UserCircle2Icon className="w-32 h-32 text-muted-foreground" />
              </div>
            </div>
          </div>

          <div className="md:w-2/3">
            <div className="w-full max-w-2xl">
              <Card className="shadow-lg border-border/50">
                <CardHeader className="border-b border-border/50 pb-4">
                  <CardTitle className="text-2xl font-semibold text-foreground">
                    User Information
                  </CardTitle>
                </CardHeader>

                {/**static profile */}

                {!editprofile && (
                  <CardContent className="space-y-4 pt-6">
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-muted-foreground">
                        Email
                      </Label>
                      <Input type="text" disabled value={userdata?.email} />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-muted-foreground">
                        Name
                      </Label>
                      <Input
                        type="text"
                        disabled
                        value={userdata?.name ?? ""}
                      />
                    </div>
                  </CardContent>
                )}

                <CardDescription className=" pt-4 pb-6 px-6">
                  {!editprofile && (
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button
                        aria-label="Edit Password"
                        title="Edit Password"
                        className="flex-1 bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors cursor-pointer"
                      >
                        Edit Password
                      </Button>

                      <Button
                        aria-label="Edit Profile"
                        title="Edit Profile"
                        className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors cursor-pointer"
                        onClick={buttonedithandler}
                      >
                        Edit Profile
                      </Button>
                    </div>
                  )}

                  {/**Updating profile */}
                  {editprofile && (
                    <Form {...METHODS}>
                      <form
                        onSubmit={METHODS.handleSubmit(UpdateProfile)}
                        className="space-y-5.5 "
                      >
                        <FormField
                          control={METHODS.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-sm font-medium text-foreground">
                                Email
                              </FormLabel>
                              <FormControl>
                                <Input
                                  type="email"
                                  {...field}
                                  placeholder={
                                    userdata.email ?? "jhon@gmail.com"
                                  }
                                  onChange={(e) => {
                                    e.target.value = e.target.value.replace(
                                      /[^a-zA-Z0-9]/g,
                                      "",
                                    );
                                    field.onChange(e);
                                  }}
                                  className=" text-foreground"
                                />
                              </FormControl>
                              <FormMessage className="text-xs text-destructive" />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={METHODS.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-sm font-medium text-foreground">
                                Name
                              </FormLabel>
                              <FormControl>
                                <Input
                                  type="text"
                                  {...field}
                                  placeholder={userdata.name ?? "jhon"}
                                  onChange={(e) => {
                                    e.target.value = e.target.value.replace(
                                      /[^a-zA-Z0-9]/g,
                                      "",
                                    );
                                    field.onChange(e);
                                  }}
                                  className=" text-foreground"
                                />
                              </FormControl>
                              <FormMessage className="text-xs text-destructive" />
                            </FormItem>
                          )}
                        />

                        <div className="flex flex-col sm:flex-row gap-3 pt-4 ">
                          <Button
                            type="button"
                            aria-label="Cancel"
                            title="Cancel"
                            variant="outline"
                            className="flex-1 h-10 px-4 py-2 bg-background border-input hover:bg-secondary/10 hover:text-foreground transition-colors cursor-pointer rounded-md"
                            onClick={() => setEditProfile((prev) => !prev)}
                          >
                            Cancel
                          </Button>

                          <Button
                            type="submit"
                            aria-label="Save"
                            title="Save"
                            className="flex-1 h-10 px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors cursor-pointer rounded-md shadow-sm"
                          >
                            Save
                          </Button>
                        </div>
                      </form>
                    </Form>
                  )}
                </CardDescription>
              </Card>
            </div>
          </div>
        </div>
        {settings && <Settings close={() => setSettings((prev) => !prev)} />}
        {terms && <Terms close={() => setTerms((prev) => !prev)} />}
      </main>

      <footer className="border-t border-border mt-auto">
        <About />
      </footer>
    </div>
  );
}
