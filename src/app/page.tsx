import MainPage from "@/components/main";
import { main } from "@/server/client";

export default async function Page() {
  const disasters = await main();
  return <MainPage disasters={disasters || []} />;
}
