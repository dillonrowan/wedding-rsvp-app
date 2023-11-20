"use client";
import React, { useState } from "react";
import RsvpGroupUpdateForm from "./RsvpGroupUpdateForm";


export default async function RsvpGroupSearchResultBody(props) {
    const [selectedRsvpGroup, setSelectedRsvpGroup] = useState(null);
    let temp = null;
    

    const handleSubmit = (e) => {
        e.preventDefault();
        setSelectedRsvpGroup(JSON.parse(temp));
    };

    return (
        <>
            {               
                props.rsvpGroups.length > 1 ? (
                    <p>
                        We've found more than one match in the guest list. Please
                        select your name from the list below.
                    </p>
                ) : (
                    <p>
                        We’ve found you in the guest list. Please confirm your name
                        below to continue with your RSVP.
                    </p>
                )
            }
            {!selectedRsvpGroup ? (
                <div>
                    <form
                        onSubmit={(e) => {
                            handleSubmit(e);
                        }}>
                        {props.rsvpGroups?.map((rsvpGroup) => (
                            <div key={rsvpGroup.id}>
                                <input
                                    type="radio"
                                    name="rsvp-group"
                                    value={JSON.stringify(rsvpGroup)}
                                    onChange={(e) => {
                                        temp = e.target.value;
                                    }}></input>
                                <span>
                                    {rsvpGroup.rsvps
                                        .map((rsvp) => rsvp.name)
                                        .join(" & ")}
                                </span>
                            </div>
                        ))}
                        <input type="submit" value="Submit"></input>
                    </form>
                </div>
            ) : (
                <div>
                    <RsvpGroupUpdateForm rsvpGroup={selectedRsvpGroup} />
                </div>
            )}
        </>
    );
}
