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
import { useEffect, useState } from "react";
import Image from "next/image";
import { Camera, Loader2, X } from "lucide-react";
import { uploadImage } from "@/lib/handle-upload";
import { useUser } from "../_context/UserContext";
import axios from "axios";

const formSchema = z.object({
  photo: z.string().nonempty("Зураг заавал шаардлагатай"),
  name: z.string().nonempty("Нэр заавал шаардлагатай"),
  about: z.string().nonempty("Тайлбар заавал шаардлагатай"),
  url: z.string().url("Зөв URL оруулна уу").nonempty("URL заавал шаардлагатай"),
});

export const PersonalInfo = () => {
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [avatarImageFile, setAvatarImageFile] = useState<File | null>(null);
  const [userId, setUserId] = useState<number | null>(null);
  const { logedUser } = useUser()!;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      photo: "",
      name: "",
      about: "",
      url: "",
    },
  });

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
        alert(res.data.message);
      }
    } catch (err) {
      console.error(err);
      alert("error ");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const value = localStorage.getItem("userId");
    setUserId(Number(value));
  }, [userId, form, loading, logedUser]);

  useEffect(() => {
    if (logedUser) {
      form.reset({
        photo: logedUser?.profile?.avatarImage,
        name: logedUser?.profile?.name,
        about: logedUser?.profile?.about,
        url: logedUser?.profile?.socialmediaurl,
      });
      setImage(logedUser?.profile?.avatarImage ?? null);
    }
  }, [logedUser, loading, userId, form]);

  const deleteImage = () => {
    setImage(null);
    setAvatarImageFile(null);
  };

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
                  <div>
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
                  </div>
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

          <Button
            disabled={loading}
            className="w-full h-10 cursor-pointer "
            type="submit"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" /> Loading...
              </>
            ) : (
              " Save changes"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};
