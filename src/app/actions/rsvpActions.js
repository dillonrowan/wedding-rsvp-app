"use server";

export async function deleteRsvps(groupId, names) {
    const data = {
        names: names
    };
    const res = await fetch(
        // "http://api.jenniferanddillonwedding.com:8080/api/update-rsvp-and-rsvp-groups",
        `http://localhost:8080/api/rsvps/${groupId}`,
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

    return await res.json();
}