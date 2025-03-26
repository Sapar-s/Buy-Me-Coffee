"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long." })
    .refine((password) => /[A-Z]/.test(password), {
      message: "Password must include at least one uppercase letter.",
    })
    .refine((password) => /[a-z]/.test(password), {
      message: "Password must include at least one lowercase letter.",
    })
    .refine((password) => /[0-9]/.test(password), {
      message: "Password must include at least one number.",
    }),
  confirmPassword: z.string(),
});

export const SetNewPass = () => {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }
  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full flex flex-col gap-6 items-start p-6 rounded-lg border-border border "
        >
          <h4 className="text-[16px] font-[700] leading-[28px] ">
            Set a new password
          </h4>
          <div className="w-full flex flex-col gap-3 items-start">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>New password</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter new password" {...field} />
                  </FormControl>
                  <FormDescription hidden></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Confirm password</FormLabel>
                  <FormControl>
                    <Input placeholder="Confirm password" {...field} />
                  </FormControl>
                  <FormDescription hidden></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button type="submit" className="w-full">
            Save changes
          </Button>
        </form>
      </Form>
    </>
  );
};
