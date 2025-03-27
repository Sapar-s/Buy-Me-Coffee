"use client";

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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  country: z.string().nonempty("Please select country"),
  firstName: z.string().nonempty("Please enter your first name"),
  lastName: z.string().nonempty("Please enter your last name"),
  about: z.string().nonempty("Please enter your card number"),
  expires: z.string().nonempty("Please enter month"),
  year: z.string().nonempty("Please enter year"),
  cvc: z.string().nonempty("Please enter your  cvc"),
});

export const SecondStep = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      country: "",
      firstName: "",
      lastName: "",
      about: "",
      expires: "",
      year: "",
      cvc: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    router.push("/");
  }
  return (
    <div>
      <div className="w-[510px] flex flex-col items-start ">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col w-[510px] items-start   "
          >
            <div className="w-full py-6 flex flex-col items-start gap-[6px] ">
              <h3 className="text-[24px] font-[600] leading-[32px] ">
                How would you like to be paid?{" "}
              </h3>
              <h4 className="text-[14px] leading-[20px] font-[400] text-muted-foreground ">
                Enter location and payment details
              </h4>
            </div>
            <div className="w-full flex flex-col items-start gap-6 ">
              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem className="flex w-full flex-col gap-2 items-start ">
                    <FormLabel>Select country</FormLabel>

                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="dark">Dark</SelectItem>
                        <SelectItem value="system">System</SelectItem>
                      </SelectContent>
                    </Select>

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
                name="about"
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
            <div className="flex w-full justify-end mt-6 ">
              <Button className="w-[246px] h-10 cursor-pointer " type="submit">
                Continue
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};
