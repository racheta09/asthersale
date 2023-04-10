import React, { useState } from "react"
import { ConnectWallet } from "@thirdweb-dev/react"
import Image from "next/image"

export default function Navbar(): JSX.Element {
    const [isOpen, setIsOpen] = useState(false)

    const toggleNavbar = () => {
        setIsOpen(!isOpen)
    }

    return (
        <nav className="py-4 bg-slate-200">
            <div className="container mx-auto px-4 flex items-center justify-between">
                <Image src="/token.webp" alt="logo" width="64" height="64" />
                <button
                    className="block md:hidden border border-white rounded px-3 py-2 text-white hover:text-yellow-400 hover:border-yellow-400 focus:outline-none"
                    onClick={toggleNavbar}
                >
                    {isOpen ? (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="h-6 w-6"
                        >
                            <path
                                fillRule="evenodd"
                                d="M13.293 7.293a1 1 0 0 0-1.414-1.414L10 8.586 7.121 5.707A1 1 0 1 0 5.707 7.121L8.586 10l-2.879 2.879a1 1 0 1 0 1.414 1.414L10 11.414l2.879 2.879a1 1 0 0 0 1.414-1.414L11.414 10l2.879-2.879z"
                                clipRule="evenodd"
                            />
                        </svg>
                    ) : (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="h-6 w-6"
                        >
                            <path
                                fillRule="evenodd"
                                d="M3 6h14a1 1 0 1 0 0-2H3a1 1 0 1 0 0 2zm14 5H3a1 1 0 1 0 0 2h14a1 1 0 1 0 0-2zm0 5H3a1 1 0 1 0 0 2h14a1 1 0 1 0 0-2z"
                                clipRule="evenodd"
                            />
                        </svg>
                    )}
                </button>
                <ul
                    className={`${
                        isOpen ? "block" : "hidden"
                    } md:flex md:items-center md:w-auto`}
                >
                    {/* <li>
                        <a
                            href="#"
                            className="block mt-4 md:inline-block md:mt-0 mr-6"
                        >
                            Home
                        </a>
                    </li>
                    <li>
                        <a
                            href="#"
                            className="block mt-4 md:inline-block md:mt-0 mr-6"
                        >
                            About
                        </a>
                    </li> */}
                    <li>
                        <span className="block mt-4 md:inline-block md:mt-0">
                            <ConnectWallet
                            theme="light"/>
                        </span>
                    </li>
                </ul>
            </div>
        </nav>
    )
}
