import { RecentTransaction } from "../_components/RecentTransaction";
import { UserProfile } from "../_components/UserProfile";

export default function Home() {
  return (
    <div className="w-[955px] flex flex-col gap-6 px-6 ">
      <UserProfile />
      <RecentTransaction />
    </div>
  );
}
