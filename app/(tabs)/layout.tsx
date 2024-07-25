import Link from "next/link";
import { FaCalendarCheck, FaCalendarAlt, FaTools } from "react-icons/fa";
import { RiUserReceived2Fill } from "react-icons/ri";
import { FaFileCircleCheck } from "react-icons/fa6";
import { ImHome } from "react-icons/im";
import { BsFillInfoSquareFill } from "react-icons/bs";


export default function TabsRootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <main className="flex max-h-screen flex-col">
            {children}
            <div className="fixed bottom-0 p-5 px-6 flex items-center justify-between bg-gray-900 text-gray-400 cursor-pointer w-full">
                <Link 
                className="flex flex-col items-center transition ease-in duration-200 hover:text-blue-400"
                href="/"
                >
                    <ImHome className="w-8 h-8" />
                </Link>
                <Link 
                className="flex flex-col items-center transition ease-in duration-200 hover:text-blue-400"
                href="/calendar-day"
                >
                    <FaCalendarCheck className="w-8 h-8" />
                </Link>
                <Link 
                className="flex flex-col items-center transition ease-in duration-200 hover:text-blue-400"
                href="/calendar-week"
                >
                    <FaCalendarAlt className="w-8 h-8" />
                </Link>
                <Link 
                className="flex flex-col items-center transition ease-in duration-200 hover:text-blue-400"
                href="/infos"
                >
                    <BsFillInfoSquareFill className="w-8 h-8" />
                </Link>
            </div>
        </main>
    );
}