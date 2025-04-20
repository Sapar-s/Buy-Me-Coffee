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
import { ChangeEvent, useEffect, useState } from "react";
import Image from "next/image";
import { Camera } from "lucide-react";
import { uploadImage } from "@/lib/handle-upload";
import { useUser } from "../_context/UserContext";

const formSchema = z.object({
  photo: z.string().nonempty("Зураг заавал шаардлагатай"),
  name: z.string().nonempty("Нэр заавал шаардлагатай"),
  about: z.string().nonempty("Тайлбар заавал шаардлагатай"),
  url: z.string().url("Зөв URL оруулна уу").nonempty("URL заавал шаардлагатай"),
});

export const PersonalInfo = () => {
  const [image, setImage] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const { users, changeProfile, logedUser } = useUser()!;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      photo: "",
      name: "",
      about: "",
      url: "",
    },
  });

  useEffect(() => {
    if (logedUser?.profile?.avatarImage) {
      setImage(logedUser.profile?.avatarImage);
    }
  }, [logedUser]);

  if (!logedUser?.profile) {
    return <p>Loading...</p>;
  }

  const imageUpload = async () => {
    if (file) {
      const imgUrl = await uploadImage(file);
      return imgUrl;
      // console.log("uploadImage", imgUrl);
      // setImage(imgUrl);
    }
  };

  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }
    const files = e.target.files[0];
    if (files) {
      setFile(files);
      const tempImageUrl = URL.createObjectURL(files);
      setImage(tempImageUrl);
      form.setValue("photo", "uploaded");
    }
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    const image = await imageUpload();
    if (!image) {
      return;
    }
    console.log("onsubmit", image);
    try {
      if (logedUser?.profile) {
        await changeProfile(
          image,
          values.name,
          values.about,
          values.url,
          logedUser.profile.id
        );
      } else {
        console.log("Profile is not available.");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const deleteHandler = () => {
    setImage("");
    setFile(null);
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
          {image ? (
            <div className="relative  flex justify-center items-center w-[160px] h-[160px]">
              <Image
                src={image}
                alt=""
                width={160}
                height={160}
                className="rounded-full object-cover"
              />

              <Button
                type="button"
                className="absolute bg-white text-red-500 rounded-full"
                onClick={deleteHandler}
              >
                X
              </Button>
            </div>
          ) : (
            <FormField
              control={form.control}
              name="photo"
              render={({ field: { onChange, value, ...rest } }) => (
                <FormItem className="flex flex-col gap-3  items-start ">
                  <FormLabel className="text-[14px] font-[500] leading-[14px] ">
                    Add photo
                  </FormLabel>
                  <FormControl>
                    <div>
                      {image ? (
                        <div className="flex justify-center items-center">
                          <Image
                            alt="zurag"
                            src={image}
                            height={200}
                            width={200}
                            className="w-[160px] h-[160px] object-cover  rounded-full absolute "
                          />
                          <Button
                            className="absolute bg-white text-red-500 rounded-full"
                            onClick={deleteHandler}
                          >
                            X
                          </Button>
                        </div>
                      ) : (
                        <div className="flex justify-center items-center">
                          <Input
                            onChange={handleFile}
                            type="file"
                            className="w-40 h-40 rounded-full border-[2px] border-dashed "
                            {...rest}
                          />
                          <Camera className="w-[23px] h-[23px] absolute " />
                        </div>
                      )}
                    </div>
                  </FormControl>
                  <FormDescription hidden></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

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
            {loading ? "loading" : "Save changes"}
          </Button>
        </form>
      </Form>
    </div>
  );
};
