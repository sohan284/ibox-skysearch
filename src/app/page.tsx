import { Header } from "@/components/shared/Header";
import { HomeClient } from "@/components/home/HomeClient";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Header title="iBox SkySearch" subtitle="Find your perfect flight" />
      <HomeClient />
    </div>
  );
}
