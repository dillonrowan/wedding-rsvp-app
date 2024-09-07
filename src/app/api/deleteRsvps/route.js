export async function POST(request) {
    console.log("INSIDE DELTEEE******************");
    const data = await request.json();
    console.log(data);
    const res = await fetch(
        // "http://api.jenniferanddillonwedding.com:8080/api/update-rsvp-and-rsvp-groups",
        `http://localhost:8080/api/rsvps/${data.groupId}`,
        {
            method: "DELETE",
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