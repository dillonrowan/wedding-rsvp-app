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
    payload.sort();
    payload.forEach(rsvpGroup => {
        rsvpGroup.rsvps.sort();
    });
    const status = res.status;
    // TODO: find out why we are not making a request for everytime we navigate to this route without refreshing.
    return (
        <div className="lg:pt-24 flex flex-col items-center">            
            {   
                status == 404 ? [
                    <p key="404-explanation" className="font-cormorant">Could not find any rsvp's matching search input; try again</p>,
                    <div key="404-search-rsvp-input"><SearchRsvpByNameForm /></div>]
                    :
                    status != 200 ? 
                        [<p key="202-explanation" className="font-cormorant">Something went wrong. Please reach out to us with the error and we will sort you out.</p>,
                            <div key="result-error-message">Error: {payload.message}</div>]
                        :
                        <RsvpGroupSearchResultBody rsvpGroups={payload} />
            }            
        </div>        
    );
}

