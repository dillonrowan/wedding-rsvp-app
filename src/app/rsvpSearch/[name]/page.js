import React from "react";
import RsvpGroupSearchResultBody from "../../../components/RsvpGroupSearchResultBody";
import SearchRsvpByNameForm from "../../../components/SearchRsvpByNameForm";

export default async function Page({ params }) {
    const res = await fetch(
        `http://api.jenniferanddillonwedding.com:8080/api/rsvp-groups-by-name/${params.name}`,
        {
            cache: "no-store",
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
    console.log("THIS IS payload!!!!!!!");
    console.log(payload);

    return (
        <>
            {
                status == 404 ? [
                    <p key="404-explanation">Could not find any rsvp's matching search input; try again</p>,
                    <div key="404-search-rsvp-input"><SearchRsvpByNameForm /></div>]
                    :
                    status != 200 ? 
                        [<p key="202-explanation">Something went wrong. Please reach out to us with the error and we will sort you out.</p>,
                            <div key="result-error-message">Error: {payload.message}</div>]
                        :
                        <RsvpGroupSearchResultBody rsvpGroups={payload} />
            }            
        </>
        
    );
}
