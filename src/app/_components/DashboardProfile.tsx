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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Coffee } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const formSchema = z.object({
  amount: z.string().nonempty("Please select an amount"),
  url: z.string().nonempty("Please enter a valid URL"),
  message: z.string().nonempty("Please enter a message"),
});

export const DashboardProfile = () => {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: "",
      url: "",
      message: "",
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
          className="w-[628px] flex flex-col items-start gap-8 p-6 bg-background rounded-lg border-border border z-50 "
        >
          <div className="w-full flex items-start flex-col gap-6 ">
            <h3 className="text-[24px] font-[600] leading-[32px] ">
              Buy Jake a Coffee
            </h3>
            <div className="w-full flex items-start gap-2 flex-col ">
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Select amount:</FormLabel>
                    <FormControl>
                      <ToggleGroup
                        type="single"
                        defaultValue={field.value}
                        onValueChange={(value) => {
                          if (value) field.onChange(value);
                        }}
                      >
                        <ToggleGroupItem
                          value="one"
                          className="rounded-md  data-[state=on]:border-2 h-[44px] data-[state=on]:border-black"
                          aria-label="Toggle $1"
                        >
                          <Badge
                            className={`h-10 py-2 px-4 }`}
                            variant="secondary"
                          >
                            <Coffee /> $1
                          </Badge>
                        </ToggleGroupItem>
                        <ToggleGroupItem
                          className="rounded-md data-[state=on]:border-2 h-[44px] data-[state=on]:border-black"
                          value="two"
                          aria-label="Toggle $2"
                        >
                          <Badge
                            className="h-10 py-2 px-4 "
                            variant="secondary"
                          >
                            <Coffee /> $2
                          </Badge>
                        </ToggleGroupItem>
                        <ToggleGroupItem
                          className="rounded-md data-[state=on]:border-2 h-[44px] data-[state=on]:border-black"
                          value="five"
                          aria-label="Toggle $5"
                        >
                          <Badge
                            className="h-10 py-2 px-4 "
                            variant="secondary"
                          >
                            <Coffee /> $5
                          </Badge>
                        </ToggleGroupItem>
                        <ToggleGroupItem
                          className="rounded-md data-[state=on]:border-2 h-[44px] data-[state=on]:border-black"
                          value="ten"
                          aria-label="Toggle $10"
                        >
                          <Badge
                            className="h-10 py-2 px-4 "
                            variant="secondary"
                          >
                            <Coffee /> $10
                          </Badge>
                        </ToggleGroupItem>
                      </ToggleGroup>
                    </FormControl>
                    <FormDescription hidden></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="w-full flex items-start gap-5 flex-col ">
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Enter BuyMeCoffee or social acount URL:</FormLabel>
                  <FormControl>
                    <Input placeholder="buymeacoffee.com/" {...field} />
                  </FormControl>
                  <FormDescription hidden></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Special message:</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Please write your message here"
                      className="w-full h-[131px] "
                      {...field}
                    />
                  </FormControl>
                  <FormDescription hidden></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button className="w-full h-10 " type="submit">
            Support
          </Button>
        </form>
      </Form>
    </>
  );
};
