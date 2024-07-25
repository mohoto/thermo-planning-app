import Link from "next/link";
import { FaCalendarCheck, FaCalendarAlt, FaTools } from "react-icons/fa";
import { RiUserReceived2Fill } from "react-icons/ri";
import { FaFileCircleCheck } from "react-icons/fa6";
import { ImHome } from "react-icons/im";
import { IoLogOut } from "react-icons/io5";


export default function InfosRootLayout({
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
                href="/infos/installe"
                >
                    <FaCalendarCheck className="w-8 h-8" />
                </Link>
                <Link 
                className="flex flex-col items-center transition ease-in duration-200 hover:text-blue-400"
                href="/infos/replanifie"
                >
                    <FaFileCircleCheck className="w-8 h-8" />
                </Link>
                <Link 
                className="flex flex-col items-center transition ease-in duration-200 hover:text-blue-400"
                href="/infos/sign-out"
                >
                    <IoLogOut className="w-8 h-8" />
                </Link>
            </div>
        </main>
    );
}