"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  username: z.string().nonempty("Please enter your message"),
});

export const SuccessPage = () => {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
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
          className="w-full flex flex-col gap-6 items-start p-6 rounded-lg border-border border mb-[89px] "
        >
          <h4 className="text-[16px] font-[700] leading-[28px] ">
            Success page
          </h4>
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Confirmation message</FormLabel>
                <FormControl>
                  <Textarea
                    className="h-[131px] w-full "
                    placeholder="Enter your message here"
                    {...field}
                  />
                </FormControl>
                <FormDescription hidden></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="w-full " type="submit">
            Save changes
          </Button>
        </form>
      </Form>
    </>
  );
};
