"use client";
import Link from "../../node_modules/next/link";
import React, { useState } from "react";

export default function Drawer(props) {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <>
            <div><button onClick={()=> {setIsOpen(true);}} className="lg:hidden w-full text-4xl bg-transparent font-cormorant font-bold">≡</button></div>
            <main
                className={
                    " fixed overflow-hidden z-10 bg-gray-900 bg-opacity-25 inset-0 transform ease-in-out " +
            (isOpen
                ? " transition-opacity opacity-100 duration-500 translate-x-0  "
                : " transition-all delay-500 opacity-0 -translate-x-full  ")
                }
            >
                <section
                    className={
                        " w-3/6 max-w-lg left-0 absolute bg-white h-full shadow-xl delay-400 duration-500 ease-in-out transition-all transform  " +
            (isOpen ? " translate-x-0 " : " -translate-x-full ")
                    }
                >
                    <article className="relative max-w-lg flex flex-col overflow-y-scroll h-full">
                        <header className="items-start h-full p-4 font-bold text-lg flex justify-end text-slate-700">
                            <button 
                                onClick={() => {
                                    setIsOpen(false);
                                }}
                                className="font-cormorant w-6 text-2xl select-none outline-none">X
                            </button>
                        </header>
                        {props.navItems.map(([title, url]) => (
                            <Link
                                key={title}
                                href={url}
                                onClick={() => {
                                    setIsOpen(false);
                                }}
                                className="font-cormorant px-3  text-slate-700 font-medium py-5">
                                {title}
                            </Link>
                        ))}
                    </article>
                </section>
                <section
                    className=" w-screen h-full cursor-pointer "
                    onClick={() => {
                        setIsOpen(false);
                    }}
                ></section>
            </main>
        </>
   
    );
}