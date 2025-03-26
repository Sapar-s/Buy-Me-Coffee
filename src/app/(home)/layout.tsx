import { ReactNode } from "react";
import { HomeSideBar } from "../_components/HomeSideBar";
import { Header } from "../_components/Header";

type Props = {
  children: ReactNode;
};

const Layout = (props: Props) => {
  return (
    <div>
      <div className="sticky top-0 z-50">
        <Header />
      </div>

      <div className="w-screen justify-center px-[80px] flex mt-10 ">
        <div className="sticky  top-[96px] h-[300px] ">
          <HomeSideBar />
        </div>

        {props.children}
      </div>
    </div>
  );
};

export default Layout;
