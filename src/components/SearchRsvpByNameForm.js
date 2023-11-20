"use client";
import React from "react";
import { useState } from "react";
import SearchText from "./SearchText";
import { useRouter, usePathname, redirect } from "next/navigation";

export default function SearchRsvpByNameForm() {
    const [groupSearchInput, setGroupSearchInput] = useState(null);
    const router = useRouter();
    const path = `rsvpSearch/${groupSearchInput}`;

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
                <SearchText handleInput={setGroupSearchInput} />
            </form>
        </div>
    );
}
