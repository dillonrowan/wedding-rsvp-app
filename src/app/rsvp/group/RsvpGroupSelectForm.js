import React from 'react';

export default function RsvpGroupSelectForm(props) {

	return (
		<div>
			<form action={`${process.env.NEXT_PUBLIC_HOST}/rsvp/group/details`}>
                {props.rsvpGroups?.map((rsvpGroup) => (                        
					<div key={rsvpGroup.id}>
						<input type="radio" name="rsvp-group" value={JSON.stringify(rsvpGroup)}></input>
						<span>{rsvpGroup.rsvps.map((rsvp) => rsvp.name).join(" & ")}</span>
					</div>
                ))}
                <input type="submit" value="Submit"></input>
            </form>
		</div>
	)
}
