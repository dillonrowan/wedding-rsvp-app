export async function POST(request) {
    const data = await request.json();
    const res = await fetch(
        "http://api.jenniferanddillonwedding.com:8080/api/update-rsvp-and-rsvp-groups",
        {
            method: "POST",
            mode: "no-cors",
            withCredentials: true,
            headers: {
                "x-api-key": process.env.API_KEY,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        }
    );

    return res;
}
