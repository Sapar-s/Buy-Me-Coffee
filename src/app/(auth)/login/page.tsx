"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import axios from "axios";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

const LoginPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    login(values.email, values.password);
  }

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const res = await axios.post("/api/sign-in", {
        email: email,
        password: password,
      });

      localStorage.setItem("userId", res.data.user.id);

      if (res.data.error) {
        alert(res.data.message);
        return;
      }

      router.push("/profile");
    } catch (error) {
      console.log("error", error);
      alert("error in login function");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center ">
      <Link href={"/sign-up"}>
        <Button
          variant={"secondary"}
          className="h-10 absolute top-[32px] right-[80px] cursor-pointer "
        >
          Sign up
        </Button>
      </Link>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-[407px] flex flex-col items-start rounded-lg  "
        >
          <div className="flex flex-col items-start p-6  ">
            <h3 className="text-[24px] font-[600] leading-[32px] w-full ">
              Welcome back
            </h3>
          </div>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-[10px] items-start px-[24px] pb-[24px] w-full  ">
                <div className="flex flex-col items-start gap-2 w-full  ">
                  <FormLabel className="text-[14px] font-[500] leading-[14px]  ">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Enter email here" {...field} />
                  </FormControl>
                </div>

                <FormDescription hidden></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-[10px] items-start px-[24px] pb-[24px] w-full  ">
                <div className="flex flex-col items-start gap-2 w-full  ">
                  <FormLabel className="text-[14px] font-[500] leading-[14px]  ">
                    Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter password here"
                      {...field}
                    />
                  </FormControl>
                </div>

                <FormDescription hidden></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex items-start gap-[10px] px-[24px] pb-[24px] w-full ">
            <Button
              disabled={loading}
              type="submit"
              variant="default"
              className="w-full cursor-pointer h-10"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" /> Loading...
                </>
              ) : (
                " Continue"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default LoginPage;
