import Link from "next/link";
import { IoChevronForwardSharp } from "react-icons/io5";

<IoChevronForwardSharp />

export default function Home() {
  return (
    <main className="h-screen">
      <div className="mt-20">
        <Link href="/calendar-day" className="flex justify-between px-3 bg-gray-100 py-6">
          <h3>Mon planning à moi</h3>
          <IoChevronForwardSharp className="w-6 h-6"/>
        </Link>
      </div>
    </main>
  );
}
