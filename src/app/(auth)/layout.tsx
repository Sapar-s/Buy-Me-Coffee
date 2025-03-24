import { ReactNode } from "react";
import { SideBar } from "../_components/SideBar";

type Props = {
  children: ReactNode;
};

const Layout = (props: Props) => {
  return (
    <div className="flex gap-[20px] ">
      <SideBar />
      <div className="w-full">{props.children}</div>
    </div>
  );
};

export default Layout;
