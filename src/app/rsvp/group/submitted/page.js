"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import SubmitButton from "../../../../components/SubmitButton";

export default async function Page({ params, searchParams }) {
    const router = useRouter();
    const status = searchParams["status"];

    const handleOkClicked = (e) => {
        router.push(`${process.env.NEXT_PUBLIC_HOST}/`);
    };

    return (
        <div className="flex justify-center">       
            <div className="lg:pt-24 lg:w-1/3 flex flex-col items-center ">
                <div className="font-cormorant text-2xl pb-8">
                    {status == 200 ? <p>Rsvp successfully updated!</p> : <p>Something went wrong. Please notify us and we'll sort you out.</p>}
                </div>
                <SubmitButton label="OK" onButtonClick={(e) => {handleOkClicked(e);}}/>
            </div>            
        </div>
    );
}
