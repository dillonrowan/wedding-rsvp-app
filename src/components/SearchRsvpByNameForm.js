"use client";
import React from "react";
import { useState } from "react";
import SearchText from "./SearchText";
import { useRouter, usePathname, redirect } from "next/navigation";

export default function SearchRsvpByNameForm() {
    const [groupSearchInput, setGroupSearchInput] = useState(null);
    const router = useRouter();
    const path = `rsvp/search/${groupSearchInput}`;

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("INSIDE SUBMIT");
        if(groupSearchInput) {
            console.log("MADE IT HERE");
            router.push(`${process.env.NEXT_PUBLIC_HOST}/` + path);
        }        
    };

    return (
        <div>
            <form
                onSubmit={(e) => {
                    handleSubmit(e);
                }}>
                <div className="py-8"><SearchText handleInput={setGroupSearchInput} placeholder={"Full Name"} /></div>
                <button className="w-full font-cormorant h-14 bg-black hover:bg-gray-700 text-white font-bold py-2 px-4 border disabled:bg-gray-400" type="submit" disabled={groupSearchInput ? false : true}>FIND YOUR INVENTATION</button>
            </form>
        </div>
    );
}
