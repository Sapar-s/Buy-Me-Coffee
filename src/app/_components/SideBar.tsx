import { Coffee } from "lucide-react";
import Image from "next/image";

export const SideBar = () => {
  return (
    <div className="bg-[#FBBF24] w-full h-screen flex items-center justify-center ">
      <div className="flex items-center gap-2 absolute top-[32px] left-[80px] ">
        <Coffee />
        <h4 className="text-[16px] font-[700] leading-[20px]  ">
          Buy Me Coffee
        </h4>
      </div>
      <div className="inline-flex flex-col gap-10 items-center ">
        <Image alt="" src={"/coffee.png"} height={240} width={240} />
        <div className="flex flex-col gap-3 items-start ">
          <h4 className="text-[24px] font-[700] leading-normal w-[455px] text-center ">
            Fund your creative work
          </h4>
          <h4 className="text-[16px] font-[400] leading-[24px] w-[455px] text-center ">
            Accept support. Start a membership. Setup a shop. It’s easier than
            you think.
          </h4>
        </div>
      </div>
    </div>
  );
};
