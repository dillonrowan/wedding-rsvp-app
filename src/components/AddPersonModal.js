"use client";

import { useState } from "react";
import SearchText from "@/components/SearchText";
import { useRouter, usePathname, redirect } from "next/navigation";
import SubmitButton from "@/components/SubmitButton";

export default function DeleteConfirmModal(props) {
    const [textInput, setTextInput] = useState("");
    // const router = useRouter();
    // const path = `/rsvp/search/${groupSearchInput}`;

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(e);
        props.handleAdd(textInput);
        // if(groupSearchInput) {
        //     router.push(path);
        // }        
    };

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
            <div className="w-10/12 lg:w-4/12 p-8 border w-96 shadow-lg rounded-md bg-white">
                <div className="text-center">
                    <h3 className="pb-8 font-cormorant font-cormorant text-2xl">What is this guest's name?</h3>
                    <div className="">
                        
                        <div className="">
                            <form
                                onSubmit={(e) => {
                                    handleSubmit(e);
                                }}>
                                <div>
                                    <div className="py-8"><SearchText handleInput={setTextInput} placeholder={"Full Name"} /></div>
                                </div>
                                <div className="flex justify-around">
                                    <div className="w-auto"><SubmitButton label="ADD" isDisabled={textInput ? false : true} /></div>
                                    <button
                                        onClick={props.handleModalClose}
                                        className="px-4 py-2 font-cormorant bg-black text-white text-base font-medium shadow-sm hover:bg-gray-700"
                                    >
                                        CLOSE
                                    </button> 
                                </div>                                 
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}