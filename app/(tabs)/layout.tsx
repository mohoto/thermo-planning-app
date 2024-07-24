import Link from "next/link";
import { FaCalendarCheck, FaCalendarAlt, FaTools } from "react-icons/fa";
import { RiUserReceived2Fill } from "react-icons/ri";
import { FaFileCircleCheck } from "react-icons/fa6";


export default function TabsRootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <main className="flex max-h-screen flex-col">
            <div className="bg-gray-100 flex justify-between w-full px-6 items-center fixed top-0 z-20 h-12">
                <Link 
                className="text-lg"
                href="/"
                >
                    index
                </Link>
                <Link href="/logout">
                    <RiUserReceived2Fill className="w-8 h-8" />
                </Link>
                <div>

                </div>
            </div>
            {children}
            <div className="fixed bottom-0 p-5 px-6 flex items-center justify-between bg-gray-900 text-gray-400 cursor-pointer w-full">
                <div className="flex flex-col items-center transition ease-in duration-200 hover:text-blue-400 ">
                    <FaCalendarCheck className="w-8 h-8" />
                </div>
                <div className="flex flex-col items-center transition ease-in duration-200 hover:text-blue-400 ">
                    <FaCalendarAlt className="w-8 h-8" />
                </div>
                <div className="flex flex-col items-center transition ease-in duration-200 hover:text-blue-400 ">
                    <FaTools className="w-8 h-8" />
                </div>
                <div className="flex flex-col items-center transition ease-in duration-200 hover:text-blue-400 ">
                    <FaCalendarCheck className="w-8 h-8" />
                </div>
                <div className="flex flex-col items-center transition ease-in duration-200 hover:text-blue-400 ">
                    <FaFileCircleCheck className="w-8 h-8" />
                </div>
            </div>
        </main>
    );
}