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
import axios from "axios";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { useProfile } from "../_context/ProfileContext";

const formSchema = z.object({
  successMessage: z.string().nonempty("Please enter your message"),
});

export const SuccessPage = () => {
  const [loading, setLoading] = useState(false);
  const { getSuccessMessage, userId, successMessage } = useProfile()!;

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      successMessage: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    if (!userId || userId <= 0) {
      console.warn("Invalid userId", userId);
      setLoading(false);
      return;
    }
    try {
      const res = await axios.post("/api/success-page", {
        userId: userId,
        successMessage: values.successMessage,
      });

      if (res.status === 200) {
        alert("Successfully completed success message");
        form.reset({ successMessage: values.successMessage });
      } else {
        alert("Something went wrong");
      }

      getSuccessMessage();
    } catch (error) {
      console.log("error", error);

      alert("error in success message fetch function");
    } finally {
      setLoading(false);
    }
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  useEffect(() => {
    if (userId) {
      getSuccessMessage();
    }
  }, [userId]);

  useEffect(() => {
    if (successMessage !== null) {
      form.reset({ successMessage });
    }
  }, [successMessage]);

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
            name="successMessage"
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
          <Button
            className="w-full cursor-pointer "
            disabled={loading}
            type="submit"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" /> Loading...
              </>
            ) : (
              "Save changes"
            )}
          </Button>
        </form>
      </Form>
    </>
  );
};
