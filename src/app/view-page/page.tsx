import { AddCoverImg } from "../_components/AddCoverImg";
import { DashboardProfile } from "../_components/DashboardProfile";
import { Header } from "../_components/Header";
import { PersonalPage } from "../_components/PersonalPage";

const Page = () => {
  return (
    <div>
      <Header />
      <AddCoverImg />
      <div className="w-screen px-[80px] flex gap-5 justify-center mt-[-86px] ">
        <PersonalPage />
        <DashboardProfile />
      </div>
    </div>
  );
};

export default Page;
