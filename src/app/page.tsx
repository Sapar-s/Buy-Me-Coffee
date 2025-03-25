import { Header } from "./_components/Header";
import { HomeSideBar } from "./_components/HomeSideBar";
import { UserProfile } from "./_components/UserProfile";

export default function Home() {
  return (
    <div>
      <Header />
      <div className="w-screen px-[80px] mt-10 ">
        <HomeSideBar />
        <div className="">
          <UserProfile />
          <div></div>
        </div>
      </div>
    </div>
  );
}
