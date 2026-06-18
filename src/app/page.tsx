import { Header } from "@/components/shared/Header";
import { HomeClient } from "@/components/home/HomeClient";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/50 to-gray-50 font-sans">
      <Header title="iBox SkySearch" subtitle="Find your perfect flight" />
      <HomeClient />
    </div>
  );
}
