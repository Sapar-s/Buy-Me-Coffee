import { ReactNode } from "react";
import { HomeSideBar } from "../_components/HomeSideBar";
import { Header } from "../_components/Header";

type Props = {
  children: ReactNode;
};

const Layout = (props: Props) => {
  return (
    <div>
      <Header />
      <div className="w-screen justify-center px-[80px] flex mt-10 ">
        <HomeSideBar />
        {props.children}
      </div>
    </div>
  );
};

export default Layout;
