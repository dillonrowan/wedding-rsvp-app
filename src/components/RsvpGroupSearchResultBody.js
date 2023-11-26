"use client";
import React, { useState, useEffect } from "react";
import RsvpGroupUpdateForm from "./RsvpGroupUpdateForm";
import { useRouter, usePathname, redirect } from "next/navigation";
import SubmitButton from "./SubmitButton";

export default function RsvpGroupSearchResultBody(props) {
    const [selectedRsvpGroup, setSelectedRsvpGroup] = useState(null);
    const [selectedTemp, setSelectedTemp] = useState(null);

    const router = useRouter();

    const handleSubmit = (e) => {
        e.preventDefault();
        setSelectedRsvpGroup(JSON.parse(selectedTemp));
    };

    const handleBackButtonClicked = (e) => {
        router.push(`${process.env.NEXT_PUBLIC_HOST}/rsvp`);
    };

    if(!selectedRsvpGroup) {
        return (
            <div className="lg:w-1/3">
                <div className="pb-7">
                    {                               
                        props.rsvpGroups.length > 1 ? (
                            <p className="font-cormorant text-2xl">
                                We've found more than one match in the guest list. Please
                                select your name from the list below.
                            </p>                    
                        ) : (
                            <p className="font-cormorant text-2xl">
                                We’ve found you in the guest list. Please confirm your name
                                below to continue with your RSVP.
                            </p>                  
                        )
                    }
                </div>                
                <div>
                    <form
                        className="pb-5"
                        onSubmit={(e) => {
                            handleSubmit(e);
                        }}>
                        {props.rsvpGroups?.map((rsvpGroup) => (
                            <div key={rsvpGroup.id} className="font-cormorant flex items-center pb-7">
                                <input
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
                                    type="radio"
                                    name="rsvp-group"
                                    value={JSON.stringify(rsvpGroup)}
                                    onChange={(e) => {
                                        setSelectedTemp(e.target.value);
                                    }}></input>
                                <label className="pl-1">
                                    {rsvpGroup.rsvps
                                        .map((rsvp) => rsvp.name)
                                        .join(" & ")}
                                </label>
                            </div>
                        ))}
                        <SubmitButton label="CONTINUE" isDisabled={selectedTemp == null ? true : false}/>
                    </form>
                    <SubmitButton label="BACK" onButtonClick={(e) => { handleBackButtonClicked(e); }} />
                </div>
            </div>
        );
    }

    return (
        <div>
            <div>
                <RsvpGroupUpdateForm rsvpGroup={selectedRsvpGroup} />
            </div>
        </div>
    );
}
