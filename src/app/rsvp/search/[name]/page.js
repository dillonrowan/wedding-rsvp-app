import React from "react";
import RsvpGroupSearchResultBody from "../../../../components/RsvpGroupSearchResultBody";
import SearchRsvpByNameForm from "../../../../components/SearchRsvpByNameForm";

export default async function Page({ params }) {
    const res = await fetch(
        `http://api.jenniferanddillonwedding.com:8080/api/rsvp-groups-by-name/${params.name}`,
        {
            cache: "no-cache",
            method: "GET",
            withCredentials: true,
            headers: {
                "x-api-key": process.env.API_KEY,
                "Content-Type": "application/json",
            },
        }
    );
    const payload = await res.json();
    
    const status = res.status;
    if(status == 200) {
        payload.forEach(rsvpGroup => {
            sortByName(rsvpGroup.rsvps, rsvpGroup.groupLead);
        });
    }
    
    return (
        <div className="flex flex-col lg:items-center">            
            {   
                status == 404 ? [
                    <p key="404-explanation" className="font-cormorant text-2xl lg:w-1/3  pt-20">Could not find any rsvp's matching search input; please try again.</p>,
                    <div key="404-search-rsvp-input" className="lg:w-1/3"><SearchRsvpByNameForm /></div>]
                    :
                    status != 200 ? 
                        [<p key="202-explanation" className="font-cormorant text-2xl lg:w-1/3">Something went wrong. Please reach out to us with the error and we will sort you out.</p>,
                            <div key="result-error-message" className="lg:w-1/3">Error: {payload.message}</div>]
                        :
                        <RsvpGroupSearchResultBody rsvpGroups={payload} />
            }            
        </div>        
    );
}

function sortByName(rsvps, groupLead) {
    rsvps.sort(function (a, b) {
        if(b.name == groupLead) {
            return 1;
        }

        if(a.name == groupLead) {
            return -1;
        }

        return a.name.localeCompare(b.name);
    });
}