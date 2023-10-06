import React from 'react'

export default async function Page({ params }) {
    
    // return <h1>forecastDate: {params.forecastDate}</h1>;
    const res = await fetch(`http://api.jenniferanddillonwedding.com:8080/api/rsvp-groups-by-name/${params.name}`, {
        method: "GET",
        withCredentials: true,
        headers: {
            "x-api-key": "iwjx17hoopz",
            "Content-Type": "application/json"
        },
    })
    const payload = await res.json();
    const status = res.status;
    console.log(payload)
    return (
        <>
            {
                status === 200 ? 
                    <p>We've found you in the guest list. Please confirm your name below to continue with your RSVP.</p> : 
                    
                status === 404 ?
                    <div>We're having trouble finding your invite. Please try another spelling of your name or contact us directly!</div> :
                
                <div>Something went wrong. Please notify us and we'll sort you out.</div>
            }
            <div>{JSON.stringify(payload)}</div>
            <div>status: {status}</div>
        </>
    );
    //return retProducts;
}