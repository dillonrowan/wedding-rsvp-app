"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import SubmitButton from "../../../../components/SubmitButton";

export default async function Page({ params, searchParams }) {
    const router = useRouter();
    const status = searchParams["status"];
    const action = searchParams["action"];
    const statusText = searchParams["statusText"];

    const handleOkClicked = (e) => {
        router.push("/");
    };

    return (
        <div className="flex flex-col lg:items-center">       
            <div className="lg:w-1/3">
                <div className="font-cormorant text-2xl pb-8 text-center">
                    {
                        status == 200 ? <p>RSVP data was successfully submitted!</p> : 
                            <div>Something went wrong. Please notify us and we'll sort you out. Status: {status}. Action: {action}. Status text: {statusText}.</div>
                    }
                </div>
                <SubmitButton label="OK" onButtonClick={(e) => {handleOkClicked(e);}}/>
            </div>            
        </div>
    );
}
