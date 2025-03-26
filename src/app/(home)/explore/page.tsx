import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ExternalLink, Search } from "lucide-react";
import Link from "next/link";
import React from "react";

const Explore = () => {
  return (
    <div className="w-[957px] flex flex-col p-6 ">
      <div className="w-full flex flex-col gap-6 items-start ">
        <div className="flex flex-col items-start gap-6  ">
          <h4 className="text-[20px] font-[600] leading-[28px] ">
            Explore creators
          </h4>
          <div>
            <Search className="ml-[12px] w-4 h-4 opacity-50 absolute mt-[10px] " />
            <Input
              className="w-[243px] h-[36px] pl-[32px]  "
              placeholder="Search name"
            />
          </div>
        </div>
        <div className="flex w-full p-6 items-start rounded-lg border-[1px] border-border ">
          <div className="flex flex-col gap-3 items-start ">
            <div className="w-full flex justify-between items-center ">
              <div className="flex gap-3 items-center ">
                <Avatar>
                  <AvatarImage src="/Profile.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>

                <h4 className="text-[20px] font-[600] leading-[28px] ">
                  Space ranger
                </h4>
              </div>
              <div className="flex flex-col gap-1 items-end w-[258.5px] ">
                <Link href={"/view-profile"}>
                  <Button variant={"secondary"} className="cursor-pointer ">
                    View profile <ExternalLink />
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex items-start gap-5 ">
              <div className="flex flex-col gap-2 items-start w-full ">
                <h4 className="text-[16px] font-[600] leading-[24px] w-full ">
                  About Space ranger
                </h4>
                <p className="text-[14px] font-[400] leading-[20px] w-full ">
                  All day, every day, we're watching, listening to, reading and
                  absorbing politics. It's exhausting. We then report on what
                  we've seen in a way that's as chill as possible. None of the
                  sensationalism and division you'll find elsewhere. It's about
                  clarity, focus, approachability, and having a little wry smile
                  almost all the time.
                </p>
              </div>
              <div className="flex flex-col gap-2 items-start w-full ">
                <h4 className="text-[16px] font-[600] leading-[24px] w-full ">
                  Social media URL
                </h4>
                <h5 className="text-[14px] font-[400] leading-[20px] w-full ">
                  https://buymeacoffee.com/baconpancakes1
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Explore;
