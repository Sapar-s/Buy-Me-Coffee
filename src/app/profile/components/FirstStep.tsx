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
import { useState } from "react";
import { Camera, Loader2 } from "lucide-react";
import Image from "next/image";
import { uploadImage } from "@/lib/handle-upload";

const formSchema = z.object({
  image: z.string().nonempty("Зураг заавал шаардлагатай"),
  name: z.string().nonempty("Нэр заавал шаардлагатай"),
  about: z.string().nonempty("Тайлбар заавал шаардлагатай"),
  url: z.string().url("Зөв URL оруулна уу").nonempty("URL заавал шаардлагатай"),
});

export const FirstStep = ({
  currentStep,
  setCurrentStep,
}: {
  currentStep: number;
  setCurrentStep: (_e: number) => void;
}) => {
  const [image, setImage] = useState<string | null>(null);
  const [avatarImageFile, setAvatarImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      image: "",
      name: "",
      about: "",
      url: "",
    },
  });

  const completeProfile = async (
    name: string,
    about: string,
    socialmediaurl: string
  ) => {
    setLoading(true);
    const imageURL = await uploadImage(avatarImageFile);
    try {
      const res = await fetch("/api/complete-profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          avatarimage: imageURL,
          name: name,
          about: about,
          socialmediaurl: socialmediaurl,
          userId: localStorage.getItem("userId"),
        }),
      });

      const jsonData = await res.json();
      setCurrentStep(currentStep + 1);
      alert(jsonData.message);
    } catch (error) {
      console.log("error", error);
      alert("error in completing profile");
    } finally {
      setLoading(false);
    }
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    completeProfile(values.name, values.about, values.url);
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;

    if (!file) {
      return;
    }

    setAvatarImageFile(file);

    const temImageUrl = URL.createObjectURL(file);
    setImage(temImageUrl);
    form.setValue("image", "uploaded");
  };
  return (
    <div>
      <div className="">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col w-[510px] items-start gap-6  "
          >
            <h3 className="text-[24px] font-[600] leading-[32px] ">
              Complete your profile page
            </h3>
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-3 items-start ">
                  <FormLabel>Add photo</FormLabel>
                  <FormControl>
                    {image ? (
                      <div>
                        <Image
                          alt=""
                          src={image}
                          height={160}
                          width={160}
                          className="w-40 h-40 rounded-full bg-cover bg-center "
                        />
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
            <div className="flex w-full justify-end ">
              <Button
                disabled={loading}
                className="w-[246px] h-10 cursor-pointer "
                type="submit"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin" /> Loading...
                  </>
                ) : (
                  " Continue"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};
