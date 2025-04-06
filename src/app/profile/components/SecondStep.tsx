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
import { CountryDropdown } from "@/components/ui/country-dropdown";

const formSchema = z.object({
  country: z.string().nonempty("Please select country"),
  firstName: z.string().nonempty("Please enter your first name"),
  lastName: z.string().nonempty("Please enter your last name"),
  cardNumber: z.string().nonempty("Please enter your card number"),
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
      cardNumber: "",
      expires: "",
      year: "",
      cvc: "",
    },
  });

  const connectBankCard = async (
    country: string,
    firstName: string,
    lastName: string,
    cardNumber: string,
    expires: string,
    year: string,
    cvc: string
  ) => {
    try {
      const res = await fetch("/api/bank-card", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          country: country,
          firstName: firstName,
          lastName: lastName,
          cardNumber: cardNumber,
          expires: expires,
          year: year,
          cvc: cvc,
          userId: localStorage.getItem("userId"),
        }),
      });
      const jsonData = await res.json();
      console.log("jsonData", jsonData);
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while connecting the bank card.");
    }
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("values", values);
    connectBankCard(
      values.country,
      values.firstName,
      values.lastName,
      values.cardNumber,
      values.expires,
      values.year,
      values.cvc
    );
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

                    <div className="w-full">
                      <CountryDropdown
                        placeholder="Country"
                        defaultValue={field.value}
                        onChange={(country) => {
                          field.onChange(country.alpha3);
                        }}
                      />
                    </div>

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
                name="cardNumber"
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
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full h-[36px]">
                            <SelectValue placeholder="Month" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="01">01</SelectItem>
                          <SelectItem value="02">02</SelectItem>
                          <SelectItem value="03">03</SelectItem>
                          <SelectItem value="04">04</SelectItem>
                          <SelectItem value="05">05</SelectItem>
                          <SelectItem value="06">06</SelectItem>
                          <SelectItem value="07">07</SelectItem>
                          <SelectItem value="08">08</SelectItem>
                          <SelectItem value="09">09</SelectItem>
                          <SelectItem value="10">10</SelectItem>
                          <SelectItem value="11">11</SelectItem>
                          <SelectItem value="12">12</SelectItem>
                        </SelectContent>
                      </Select>
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
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full h-[36px]">
                            <SelectValue placeholder="Year" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="2024">2024</SelectItem>
                          <SelectItem value="2025">2025</SelectItem>
                          <SelectItem value="2026">2026</SelectItem>
                          <SelectItem value="2027">2027</SelectItem>
                          <SelectItem value="2028">2028</SelectItem>
                          <SelectItem value="2029">2029</SelectItem>
                          <SelectItem value="2030">2030</SelectItem>
                          <SelectItem value="2031">2031</SelectItem>
                          <SelectItem value="2032">2032</SelectItem>
                          <SelectItem value="2033">2033</SelectItem>
                          <SelectItem value="2034">2034</SelectItem>
                        </SelectContent>
                      </Select>
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
