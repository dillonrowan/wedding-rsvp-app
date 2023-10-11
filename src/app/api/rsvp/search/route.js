import { headers } from 'next/headers'
import { NextResponse } from "next/server";

async function fetchRsvpByName(name) {
    
    // return <h1>forecastDate: {params.forecastDate}</h1>;
    const res = await fetch(`http://api.jenniferanddillonwedding.com:8080/api/rsvp-groups-by-name/${name}`, {
        cache: "no-store",
        method: "GET",
        withCredentials: true,
        headers: {
            "x-api-key": process.env.API_KEY,
            "Content-Type": "application/json"
        },
    })
    const payload = await res.json();
    return payload;
}

export async function GET(request) {
    const headersInstance = headers();

    const name = headersInstance.get('name');
    const searchParams = request.nextUrl.searchParams;    
    const query = searchParams.get('name');
    const rsvpGroups = await fetchRsvpByName(query);
    return NextResponse.json(rsvpGroups);
}