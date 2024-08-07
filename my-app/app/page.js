import { Typography, Button } from "../material_tailwind";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const demoLogin = async () => {
    
  };

  return (
    <main className="flex items-center h-full px-10 py-10">
      <div className="flex justify-between">
        <div>
          <Typography variant="h1" className="text-[50px]">
            Pantry Tracker
          </Typography>
          <Typography className="text-[30px]">
            A Pantry Tracker is a convenient app that helps you manage your
            pantry inventory, track expiration dates, and plan meals
            efficiently. Stay organized and reduce food waste by knowing exactly
            what you have on hand. Perfect for keeping your kitchen stocked and
            your shopping list updated!
          </Typography>
          <Button onClick="/login">Login</Button>
          <Button onClick={demoLogin}>Demo</Button>
        </div>
        <img src="/Landingpage.jpeg" className="w-[45%] h-[400px]" />
      </div>
    </main>
  );
}
