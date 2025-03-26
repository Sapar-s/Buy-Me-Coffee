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
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  photo: z.string().nonempty("Зураг заавал шаардлагатай"),
  name: z.string().nonempty("Нэр заавал шаардлагатай"),
  about: z.string().nonempty("Тайлбар заавал шаардлагатай"),
  url: z.string().url("Зөв URL оруулна уу").nonempty("URL заавал шаардлагатай"),
});

export const PersonalInfo = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      photo: "",
      name: "",
      about: "",
      url: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }
  return (
    <div className="w-full flex flex-col items-start gap-6 p-6 rounded-lg border-border border ">
      <h4 className="text-[16px] font-[700] leading-[28px] ">Personal Info</h4>
      {/* <div className="w-full"> */}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col w-full items-start gap-6  "
        >
          <FormField
            control={form.control}
            name="photo"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-3  items-start ">
                <FormLabel className="text-[14px] font-[500] leading-[14px] ">
                  Add photo
                </FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    className="w-40 h-40 rounded-full border-[2px] border-dashed "
                    {...field}
                  />
                </FormControl>
                <FormDescription hidden></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-col gap-3 items-start w-full ">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Name</FormLabel>
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
              name="about"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>About</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Write about yourself here "
                      className="w-full h-[131px]"
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
              name="url"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Social media URL</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https:// "
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

          <Button className="w-full h-10 cursor-pointer " type="submit">
            Save changes
          </Button>
        </form>
      </Form>
    </div>
  );
};
