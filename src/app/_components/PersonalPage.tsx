"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera, Heart, X } from "lucide-react";

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
import axios from "axios";
import { uploadImage } from "@/lib/handle-upload";
import { toast } from "sonner";

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
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [userId, setUserId] = useState<number | null>(null);
  const [avatarImageFile, setAvatarImageFile] = useState<File | null>(null);
  const { logedUser } = useUser()!;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    const imageURL = avatarImageFile
      ? await uploadImage(avatarImageFile)
      : null;
    try {
      const res = await axios.put("/api/complete-profile", {
        name: values.name,
        about: values.about,
        socialMediaURL: values.url,
        avatarImage: imageURL,
        id: userId,
      });

      if (res.status === 200) {
        toast.success("Амжилттай хадгаллаа!");
      }
    } catch (err) {
      console.error(err);
      toast.error("Зураг хадгалахад алдаа гарлаа!");
    } finally {
      setLoading(false);
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;

    if (!file) {
      return;
    }

    setAvatarImageFile(file);

    const temImageUrl = URL.createObjectURL(file);
    setImage(temImageUrl);
    form.setValue("photo", "uploaded");
  };

  const deleteImage = () => {
    setImage(null);
    setAvatarImageFile(null);
  };

  useEffect(() => {
    const value = localStorage.getItem("userId");
    setUserId(Number(value));
  }, [userId, form, loading, logedUser]);

  useEffect(() => {
    form.reset({
      photo: logedUser?.profile?.avatarImage,
      name: logedUser?.profile?.name,
      about: logedUser?.profile?.about,
      url: logedUser?.profile?.socialmediaurl,
    });
    setImage(logedUser?.profile?.avatarImage ?? null);
  }, [logedUser, loading, userId, form]);

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
                                  <div className="flex items-center justify-center w-40 h-40 relative ">
                                    <img
                                      src={image}
                                      alt=""
                                      className="w-40 h-40 rounded-full object-cover mb-2 "
                                    />
                                    <div
                                      onClick={deleteImage}
                                      className="w-[28px] h-[28px] bg-[#ffffff] hover:bg-[#dddddd] p-1 flex items-center justify-center rounded-full text-red-500 opacity-65 cursor-pointer absolute "
                                    >
                                      <X />
                                    </div>
                                  </div>
                                ) : (
                                  <label
                                    {...field}
                                    htmlFor="photo"
                                    className="w-40 h-40 rounded-full cursor-pointer border-[2px] border-dashed flex items-center justify-center "
                                  >
                                    <Camera className="text-gray-300 h-[28px] w-[28px] " />
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
