'use client'
import React from 'react';
import { useState } from 'react';
import { useRouter } from "next/navigation"

export default function RsvpGroupSelectForm(props) {
	const [selectedId, setSelectedId] = useState(null);
	const router = useRouter();

	const handleSubmit = (e) => {
		e.preventDefault();
		router.push(`${process.env.NEXT_PUBLIC_HOST}/rsvp/group/${selectedId}`)
	}

	return (
		<div>
			<form onSubmit={(e) => { handleSubmit(e) }}>
                {props.rsvpGroups?.map((rsvpGroup) => (    
                    <>
                        <div>
                            <input key={rsvpGroup.id} type="radio" name="rsvp-group" value={rsvpGroup.id} onClick={(e) => { setSelectedId(e.target.value) }}></input>
                            <span>{rsvpGroup.rsvps.map((rsvp) => rsvp.name).join(" & ")}</span>
                        </div>
                        
                    </>                       
                ))}
                <input type="submit" value="Submit"></input>
            </form>
		</div>
	)
}
