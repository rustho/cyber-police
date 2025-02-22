"use client";

import { useRouter } from "@/i18n/routing";
import { Button } from "@/components/ui/Button";

export default function GameMenu() {
  const router = useRouter();

  const handlePlay = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/app/signin");
      return;
    }
    router.push("/app/main");
  };

  const handleOptions = () => {
    router.push("/app/options");
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 p-4">
      <h1 className="text-4xl font-bold text-white">Game Menu</h1>

      <div className="flex flex-col gap-4 w-64 bg-gray-800 p-4 rounded-lg">
        <Button onClick={handlePlay}>Play</Button>

        <Button onClick={handleOptions}>Options</Button>
      </div>
    </div>
  );
}
