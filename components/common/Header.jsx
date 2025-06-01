'use client'

import { ArrowLeftCircleIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Header({ title, subTitle, img }) {
    const router = useRouter();
    return (
        <header className="bg-gradient-to-r from-blue-500 to-teal-500 text-white text-center py-12 md:px-6">
            <div className="max-w-7xl container mx-auto px-4 flex justify-between items-center">
                <div className=" space-y-2 md:space-y-4">
                    <div className="flex gap-2 items-baseline">
                    <ArrowLeftCircleIcon className="cursor-pointer" onClick={() => router.back()} />
                    <h1 className="text-xl md:text-3xl font-bold text-start"> {title}</h1>
                    </div>
                    <p className="text-base text-start max-w-4xl ">{subTitle}</p>
                </div>
                <div className="hidden md:block">
                    <img src={img} className="w-full h-40" />
                </div>
            </div>

        </header>
    );
}
