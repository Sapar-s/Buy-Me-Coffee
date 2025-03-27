import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

export const PersonalPage = () => {
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
          <Button>Edit page</Button>
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
