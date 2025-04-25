import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

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

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

const FirstStep = ({
  setCurrentStep,
  currentStep,
  setUserName,
}: {
  setCurrentStep: (_e: number) => void;
  currentStep: number;
  setUserName: (_e: string) => void;
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    setCurrentStep(currentStep + 1);
    localStorage.setItem("userName", values.username);
    setUserName(values.username);
  }

  return (
    <div className="w-full h-screen flex items-center justify-center ">
      <Link href={"/login"}>
        <Button
          variant={"secondary"}
          className="h-10 absolute top-[32px] right-[80px] cursor-pointer "
        >
          Log in
        </Button>
      </Link>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-[407px] flex flex-col items-start rounded-lg  "
        >
          <div className="flex flex-col items-start p-6 gap-[6px] ">
            <h3 className="text-[24px] font-[600] leading-[32px] w-full ">
              Create Your Account
            </h3>
            <h4 className="w-full text-[14px] font-[400] leading-[20px] text-muted-foreground ">
              Choose a username for your page
            </h4>
          </div>
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-[10px] items-start px-[24px] pb-[24px] w-full  ">
                <div className="flex flex-col items-start gap-2 w-full  ">
                  <FormLabel className="text-[14px] font-[500] leading-[14px]  ">
                    Username
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Enter username here" {...field} />
                  </FormControl>
                </div>

                <FormDescription hidden></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex items-start gap-[10px] px-[24px] pb-[24px] w-full ">
            <Button
              type="submit"
              variant="default"
              className="w-full cursor-pointer h-10"
            >
              Continue
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default FirstStep;
