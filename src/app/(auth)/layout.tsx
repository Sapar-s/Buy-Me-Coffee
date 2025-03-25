import { ReactNode } from "react";
import { AuthSideBar } from "../_components/AuthSideBar";

type Props = {
  children: ReactNode;
};

const Layout = (props: Props) => {
  return (
    <div className="flex gap-[20px] ">
      <AuthSideBar />
      <div className="w-full">{props.children}</div>
    </div>
  );
};

export default Layout;
