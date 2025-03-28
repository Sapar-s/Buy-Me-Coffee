"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

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

export const PersonalPage = () => {
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
    <div className="w-[632px] flex flex-col items-start gap-5 z-50 bg-background rounded-lg ">
      <div className="w-full p-6 items-start flex flex-col gap-2 rounded-lg border-border border ">
        <div className="w-full flex items-start justify-between ">
          <div className="flex items-center gap-3 ">
            <Avatar>
              <AvatarImage src="https://movie-app-mu-sandy-99.vercel.app/_next/image?url=https%3A%2F%2Fimage.tmdb.org%2Ft%2Fp%2Fw500%2F%2FimKSymKBK7o73sajciEmndJoVkR.jpg&w=640&q=75" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <h4 className="text-[20px] leading-[24px] font-[700] ">Jake</h4>
          </div>

          <Dialog>
            <DialogTrigger asChild>
              <Button className="cursor-pointer ">Edit page</Button>
            </DialogTrigger>
            <DialogContent className=" min-w-[558px] p-0">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="flex flex-col w-full items-start gap-6 p-6 "
                >
                  <h3 className="text-[24px] font-[600] leading-[32px] ">
                    Edit profile
                  </h3>
                  <h5 className=" text-[14px] font-[400] leading-[20px] ">
                    Make changes to your profile here. Click save when you're
                    done.
                  </h5>
                  <FormField
                    control={form.control}
                    name="photo"
                    render={({ field }) => (
                      <FormItem className="flex flex-col gap-3 items-start ">
                        <FormLabel>Add photo</FormLabel>
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
                  <div className="flex w-full justify-end gap-3 ">
                    <Button
                      variant={"secondary"}
                      className=" h-10 cursor-pointer "
                      type="button"
                    >
                      Cancel
                    </Button>
                    <Button className=" h-10 cursor-pointer " type="submit">
                      Save changes
                    </Button>
                  </div>
                </form>
              </Form>

              <DialogHeader hidden>
                <DialogTitle hidden></DialogTitle>
                <DialogDescription hidden></DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
        <div className="py-4 w-full ">
          <div className="w-full border-b-[1px] "></div>
        </div>

        <div className="flex flex-col items-start gap-3 ">
          <h4 className="text-[16px] font-[600] leading-[24px] ">About Jake</h4>
          <p className="text-[14px] font-[400] leading-[20px] w-full ">
            I’m a typical person who enjoys exploring different things. I also
            make music art as a hobby. Follow me along.
          </p>
        </div>
      </div>
      <div className="w-full flex flex-col items-start p-6 gap-3 rounded-lg border-border border ">
        <h4 className="text-[16px] font-[600] leading-[24px] w-full ">
          Social media URL
        </h4>
        <p className="font-[400] text-[14px] leading-[20px] w-full ">
          https://buymeacoffee.com/spacerulz44
        </p>
      </div>
      <div className="w-full flex flex-col items-start p-6 gap-3 rounded-lg border-border border ">
        <h4 className="text-[16px] font-[600] leading-[24px] w-full ">
          Recent Supporters
        </h4>
        <div className="w-full flex flex-col items-center p-6 gap-6 rounded-lg border-border border ">
          <div className="w-[385px] flex flex-col items-center gap-1  ">
            <div>
              <Heart />
            </div>
            <h4 className="text-[16px] font-[600] leading-[24px text-center] ">
              Be the first one to support Jake
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
};
