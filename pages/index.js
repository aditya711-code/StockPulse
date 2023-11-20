import { Inter } from "next/font/google";
import Explore from "./explore";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className='stockApp'>
      <Explore />
    </div>
  );
}
