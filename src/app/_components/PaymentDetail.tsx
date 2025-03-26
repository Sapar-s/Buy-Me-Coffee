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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  country: z.string().nonempty("Please select country"),
  firstName: z.string().nonempty("Please enter your first name"),
  lastName: z.string().nonempty("Please enter your last name"),
  card: z.string().nonempty("Please enter your card number"),
  expires: z.string().nonempty("Please enter month"),
  year: z.string().nonempty("Please enter year"),
  cvc: z.string().nonempty("Please enter your  cvc"),
});

export const PaymentDetail = () => {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      country: "",
      firstName: "",
      lastName: "",
      card: "",
      expires: "",
      year: "",
      cvc: "",
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
          className="w-full flex flex-col gap-6 items-start p-6 rounded-lg border-border border  "
        >
          <h4 className="text-[16px] font-[700] leading-[28px] ">
            Payment details
          </h4>
          <div className="w-full flex flex-col items-start gap-6 ">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col gap-2 items-start ">
                  <FormLabel>Select country</FormLabel>
                  <FormControl>
                    <Select {...field}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Country" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">United States</SelectItem>
                        <SelectItem value="dark">Russia</SelectItem>
                        <SelectItem value="system">China</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormDescription hidden></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="w-full flex items-start gap-3 ">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem className="w-full flex flex-col items-start gap-2 ">
                    <FormLabel>First name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your name here "
                        className="w-full h-10"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription hidden></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem className="w-full flex flex-col items-start gap-2 ">
                    <FormLabel>Last name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your name here "
                        className="w-full h-10"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription hidden></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="card"
              render={({ field }) => (
                <FormItem className="w-full h-[62px] flex flex-col items-start gap-2 ">
                  <FormLabel>Enter card number</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="XXXX-XXXX-XXXX-XXXX"
                      className="w-full h-10"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription hidden></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex w-full items-start gap-4 ">
              <FormField
                control={form.control}
                name="expires"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Expires</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Month"
                        className="w-full h-[36px] "
                        {...field}
                      />
                    </FormControl>
                    <FormDescription hidden></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="year"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Year</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Year"
                        className="w-full h-[36px] "
                        {...field}
                      />
                    </FormControl>
                    <FormDescription hidden></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="cvc"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>CVC</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="CVC"
                        className="w-full h-[36px] "
                        {...field}
                      />
                    </FormControl>
                    <FormDescription hidden></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <Button className="w-full h-10 cursor-pointer " type="submit">
            Save changes
          </Button>
        </form>
      </Form>
    </>
  );
};
