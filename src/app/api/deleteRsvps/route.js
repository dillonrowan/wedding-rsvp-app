export async function POST(request) {
    const data = await request.json();
    const res = await fetch(
        `http://api.jenniferanddillonwedding.com:8080/api/rsvps/${data.groupId}`,
        {
            method: "DELETE",
            withCredentials: true,
            headers: {
                "x-api-key": process.env.API_KEY,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({names : data.names}),
        }
    );

    return res;
}