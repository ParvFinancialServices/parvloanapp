'use client'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { PhoneCall, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

const NavLinks = [
    {
        name: "Home",
        url: "/"
    },
    {
        name: "About us",
        url: "/about"
    },
    {
        name: "Services",
        url: "/services"
    },
    {
        name: "EMI Calculator",
        url: "/calculator"
    },
    {
        name: "DSA",
        url: "/dsa"
    },
    {
        name: "Loan Enquiry",
        url: "/loan-enquiry"
    },
]

const Mobilenavbar = ({ openNav, toggleNav, paths }) => {
    return (
        <div>
            <Sheet open={openNav} onOpenChange={toggleNav} >
                <SheetContent className="transition-all duration-500">
                    <SheetTitle></SheetTitle>
                    <SheetHeader>
                        <Link href="/" className="flex items-center space-x-1 rtl:space-x-reverse">
                            <img src={'/logo/PAR2.png'} className="h-10" alt="Logo" />
                            <div className="flex flex-col justify-start">
                                <span className=" text-2xl text-slate-600 font-semibold whitespace-nowrap leading-5 dark:text-white">PARV</span>
                                <span className="text-[0.6rem] text-blue-600">Financial Services</span>
                            </div>
                        </Link>
                    </SheetHeader>
                    <SheetDescription className="transition-all duration-500">
                        <div className="items-center justify-between w-full md:flex md:w-auto md:order-1" >
                            <ul className="flex flex-col space-y-2 md:p-0 mt-4 font-medium text-base  md:mt-0 md:border-0 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                                {
                                    NavLinks && NavLinks?.map((item, index) => {
                                        const pathname = item?.url?.split("/")[1];

                                        return (
                                            <li key={index}>
                                                <Link href={item?.url}
                                                    className={`block py-2 px-3 rounded
                                                         ${paths.includes(pathname) ? "xl:text-blue-700 bg-blue-700 text-white" : ""}  lg:p-0 lg:dark:text-blue-500`}
                                                    aria-current="page"
                                                >
                                                    {item?.name}
                                                </Link>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                    </SheetDescription>
                </SheetContent>
            </Sheet>
        </div>
    )
}
const NavbarNew = () => {
    const [openNav, setOpennav] = useState(false);
    const toggleNav = () => (setOpennav(!openNav));
    const [navColar, setNavColar] = useState(false);
    const pathName = usePathname();
    const paths = pathName.split('/');
    paths.shift();

    // if (window.screenY > 2) {
    //     setNavColar(true)
    // }

    return (
        <div>
            <nav className={` ${navColar ? "bg-white" : "bg-blue-100/90"} dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600`}>
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <Link href="/" className="flex items-center space-x-1 rtl:space-x-reverse">
                        <img src={'/logo/PAR2.png'} className="h-10" alt="Logo" />
                        <div className="flex flex-col justify-start">
                            <span className=" text-2xl text-slate-600 font-semibold whitespace-nowrap leading-5 dark:text-white">PARV</span>
                            <span className="text-[0.6rem] text-blue-600">Financial Services</span>
                        </div>
                    </Link>
                    <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                        {/* <p className="flex items-center gap-2 text-lg font-semibold text-blue-700"><PhoneCall size={18}/> +91 9279142988</p> */}
                        <Link href="/login">
                            <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 flex items-center gap-2">
                                <User size={17} /> Login
                            </button>
                        </Link>

                        <button
                            data-collapse-toggle="navbar-sticky"
                            type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                            aria-controls="navbar-sticky"
                            aria-expanded="false"
                            onClick={toggleNav}
                        >
                            <span className="sr-only">Open main menu</span>
                            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                            </svg>
                        </button>
                    </div>
                    <div className="items-center justify-between hidden w-full lg:flex md:w-auto md:order-1" id="navbar-sticky">
                        <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg md:space-x-4 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                            {
                                NavLinks && NavLinks?.map((item, index) => {
                                    const pathname = item?.url?.split("/")[1];
                                    return (
                                        <li key={index}>
                                            <Link href={item?.url}
                                                className={`block py-2 px-1 text-slate-800  ${paths.includes(pathname) ? "md:text-blue-700 border-b border-blue-700" : ""} md:p-0 md:dark:text-blue-500`}
                                                aria-current="page"
                                            >
                                                {item?.name}
                                            </Link>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                </div>
            </nav>


            <Mobilenavbar
                openNav={openNav}
                toggleNav={toggleNav}
                paths={paths}
            />
        </div>
    )
}

export default NavbarNew;