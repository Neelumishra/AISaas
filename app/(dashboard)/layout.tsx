import Sidebar from "@/components/Sidebar"
import Navbar from "@/components/navbar";
import { getApiLimitCount } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";

async function layout({children}:{children:React.ReactNode}) {
  const apiLimitcount:number = await getApiLimitCount();
  const isPro = await checkSubscription();
  return (
    <>
      <div className="h-full relative">
        <div className="hidden md:flex md:flex-col md:fixed md:inset-y-0  bg-gray-900 md:w-72">
          <Sidebar isPro={isPro} apiLimitCount={apiLimitcount} />
        </div>
        <main className="md:pl-72">
          <Navbar />
          {children}
        </main>
      </div>
    </>
  );
}

export default layout





// interface objType {
// name : string,
// rollNo : number
// }
// let data:objType = {
//     name:"Parvat"
// }