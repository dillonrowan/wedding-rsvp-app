"use client";
import React from "react";
import { useState } from "react";
import SearchText from "./SearchText";
import { useRouter, usePathname, redirect } from "next/navigation";
import SubmitButton from "../components/SubmitButton";

export default function SearchRsvpByNameForm() {
    const [groupSearchInput, setGroupSearchInput] = useState(null);
    const router = useRouter();
    const path = `/rsvp/search/${groupSearchInput}`;

    const handleSubmit = (e) => {
        e.preventDefault();
        if(groupSearchInput) {
            router.push(path);
        }        
    };

    return (
        <div className="">
            <form
                onSubmit={(e) => {
                    handleSubmit(e);
                }}>
                <div className="py-8"><SearchText handleInput={setGroupSearchInput} placeholder={"Full Name"} /></div>
                <SubmitButton label="FIND YOUR INVITATION" isDisabled={groupSearchInput ? false : true} />
            </form>
        </div>
    );
}
