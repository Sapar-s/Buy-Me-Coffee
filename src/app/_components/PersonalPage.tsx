"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera, Heart } from "lucide-react";

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
import { useUser } from "../_context/UserContext";
import { useEffect, useState } from "react";
import { useDonation } from "../_context/DonationContext";
import Image from "next/image";

const formSchema = z.object({
  photo: z.string().nonempty("Зураг заавал шаардлагатай"),
  name: z.string().nonempty("Нэр заавал шаардлагатай"),
  about: z.string().nonempty("Тайлбар заавал шаардлагатай"),
  url: z.string().url("Зөв URL оруулна уу").nonempty("URL заавал шаардлагатай"),
});

export const PersonalPage = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const { users } = useUser()!;
  const { donationsInfo } = useDonation()!;
  const [userId, setUserId] = useState<number | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<any>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const tempImageUrl = URL.createObjectURL(file);
    setImage(tempImageUrl);
    form.setValue("photo", tempImageUrl); // Зураг path-г хадгалах
  };

  console.log("users", users);

  useEffect(() => {
    const value = Number(localStorage.getItem("userId"));
    setUserId(value);
  }, []);

  useEffect(() => {
    if (!userId || !users) return;
    const foundUser = users.find((u) => u.id === userId);
    if (foundUser && foundUser.profile) {
      const profile = foundUser.profile;
      form.reset({
        photo: profile.avatarImage ?? "",
        name: profile.name ?? "",
        about: profile.about ?? "",
        url: profile.socialmediaurl ?? "",
      });
      setImage(profile.avatarImage ?? null);
      setCurrentUser(foundUser);
    }
  }, [userId, users, form]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!currentUser || !userId) return;

    const profile = {
      name: values.name,
      about: values.about,
      socialmediaurl: values.url,
      avatarImage: values.photo,
    };

    const updateData = {
      userId,
      profile,
    };

    console.log("updateData before PUT:", updateData);

    try {
      const res = await fetch("/api/complete-profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData),
      });

      if (!res.ok) throw new Error("Алдаа гарлаа!");

      alert("Профайл амжилттай шинэчлэгдлээ!");
    } catch (err) {
      console.error("❌ Update error:", err);
      alert("Шинэчлэх үед алдаа гарлаа!");
    }
  }

  return (
    <>
      {users?.map((user) => {
        if (user.id !== userId) return null;
        return (
          <div
            key={user.id}
            className="w-[632px] flex flex-col mb-10 items-start gap-5 z-50 bg-background rounded-lg "
          >
            <div className="w-full p-6 items-start flex flex-col gap-2 rounded-lg border-border border ">
              <div className="w-full flex items-start justify-between ">
                <div className="flex items-center gap-3 ">
                  <Avatar>
                    <AvatarImage src={user?.profile?.avatarImage} />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <h4 className="text-[20px] leading-[24px] font-[700] ">
                    {user?.profile?.name}
                  </h4>
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
                          Make changes to your profile here. Click save when
                          you&#39;re done.
                        </h5>
                        <FormField
                          control={form.control}
                          name="photo"
                          render={({ field }) => (
                            <FormItem className="flex flex-col gap-3 items-start ">
                              <FormLabel>Add photo</FormLabel>
                              <FormControl>
                                {image ? (
                                  <div className="relative ">
                                    <Image
                                      alt="Profile"
                                      src={image}
                                      height={160}
                                      width={160}
                                      className="w-40 h-40 rounded-full bg-cover bg-center "
                                    />
                                    {/* <Camera className="text-gray-300 h-[28px] absolute top-[67px] left-[67px] z-40 w-[28px]" /> */}
                                    <label
                                      {...field}
                                      htmlFor="photo"
                                      className="w-[28px] h-[28px] absolute top-[67px] left-[67px]  cursor-pointer  flex items-center justify-center "
                                    >
                                      <Camera className="text-gray-300 h-[28px] z-40 w-[28px]" />
                                      <Input
                                        type="file"
                                        id="photo"
                                        className="hidden"
                                        onChange={handleFileChange}
                                      />
                                    </label>
                                  </div>
                                ) : (
                                  <label
                                    {...field}
                                    htmlFor="photo"
                                    className="w-40 h-40 rounded-full cursor-pointer border-[2px] border-dashed flex items-center justify-center "
                                  >
                                    <Camera className="text-gray-300 h-[28px] z-40 w-[28px]" />
                                    <Input
                                      type="file"
                                      id="photo"
                                      className="hidden"
                                      onChange={handleFileChange}
                                    />
                                  </label>
                                )}
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
                          <Button
                            className=" h-10 cursor-pointer "
                            type="submit"
                          >
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
                <h4 className="text-[16px] font-[600] leading-[24px] ">
                  About {user?.profile?.name}
                </h4>
                <p className="text-[14px] font-[400] leading-[20px] w-full ">
                  {user?.profile?.about}
                </p>
              </div>
            </div>
            <div className="w-full flex flex-col items-start p-6 gap-3 rounded-lg border-border border ">
              <h4 className="text-[16px] font-[600] leading-[24px] w-full ">
                Social media URL
              </h4>
              <p className="font-[400] text-[14px] leading-[20px] w-full ">
                {user?.profile?.socialmediaurl}
              </p>
            </div>
            <div className="w-full flex flex-col items-start p-6 gap-3 rounded-lg border-border border ">
              <h4 className="text-[16px] font-[600] leading-[24px] w-full ">
                Recent Supporters
              </h4>
              {donationsInfo?.length === 0 ? (
                <div className="w-full flex flex-col items-center p-6 gap-6 rounded-lg border-border border ">
                  <div className="w-[385px] flex flex-col items-center gap-1  ">
                    <div>
                      <Heart />
                    </div>
                    <h4 className="text-[16px] font-[600] leading-[24px text-center] ">
                      Be the first one to support {user?.profile?.name}
                    </h4>
                  </div>
                </div>
              ) : (
                <div className="w-full flex flex-col gap-4 items-start ">
                  {donationsInfo?.map((donation, index) => {
                    return (
                      <div
                        key={index}
                        className="w-full flex items-start gap-3 "
                      >
                        <div>
                          <Avatar className="w-10 h-10 ">
                            <AvatarImage src={donation.avatarimage} />
                            <AvatarFallback>CN</AvatarFallback>
                          </Avatar>
                        </div>
                        <div className="w-full flex flex-col items-start gap-3 ">
                          <h4 className="text-[14px] font-[650] leading-[20px] text-[#000] ">
                            {donation.name}{" "}
                            <span className="text-[14px] font-[500] leading-[20px] text-foreground ">
                              bought ${donation.amount} coffee
                            </span>
                          </h4>
                          <h4 className="text-[14px] font-[400] leading-[20px] ">
                            {donation.specialmessage}
                          </h4>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </>
  );
};
