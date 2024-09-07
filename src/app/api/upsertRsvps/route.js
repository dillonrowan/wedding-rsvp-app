export async function POST(request) {
    const data = await request.json();
    const res = await fetch(
        `http://api.jenniferanddillonwedding.com:8080/api/rsvps/${data.groupId}`,
        {
            method: "PUT",
            withCredentials: true,
            headers: {
                "x-api-key": process.env.API_KEY,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data.rsvps),
        }
    );

    return res;
}