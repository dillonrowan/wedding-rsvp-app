import React from "react";

export default async function Page({ params, searchParams }) {
    console.log("THIS IS PARAMS******************************");
    // const params = useParams();
    console.log(params);
    console.log(searchParams);
    const status = searchParams["status"];

    if (status == 200) {
        return (
            <>
                <p>Rsvp successfully updated!.</p>
            </>
        );
    } else {
        return (
            <>
                <div>
                    <p>
						Something went wrong. Please notify us and we'll sort
						you out.
                    </p>
                </div>
            </>
        );
    }
}
