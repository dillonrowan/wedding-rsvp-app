import React from 'react'
import RsvpGroupSelectForm from '../../RsvpGroupSelectForm';
import SearchRsvpByNameForm from '../../../../../components/SearchRsvpByNameForm';

export default async function Page({ params }) {
    console.log('THIS IS PARAMS')
    console.log(params)
    const res = await fetch(`http://api.jenniferanddillonwedding.com:8080/api/rsvp-groups-by-name/${params.name}`, {
        cache: "no-store",
        method: "GET",
        withCredentials: true,
        headers: {
            "x-api-key": process.env.API_KEY,
            "Content-Type": "application/json"
        },
    })
    const payload = await res.json();
    const status = res.status;
    console.log(payload)

    if(status == 200) {
        return (
            <>
                {
                    payload?.length > 1 ? <p>We've found more than one match in the guest list. Please select your name from the list below.</p>
                    : <p>We’ve found you in the guest list. Please confirm your name below to continue with your RSVP.</p>
                }
                <RsvpGroupSelectForm rsvpGroups={payload} />
            </>            
        )
    } else if(status == 404) {
        return (
            <>
                <div>We're having trouble finding your invite. Please try another spelling of your name or contact us directly!</div>
                <SearchRsvpByNameForm />
            </>
        )
    } else {
        return (
            <>
                <div>
                    <p>Something went wrong. Please notify us and we'll sort you out.</p>
                </div>
            </>
        )        
    }
}