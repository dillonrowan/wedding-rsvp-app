'use client'
import React from 'react';
import { useParams } from 'next/navigation';

function getFormData(params) {
    const data = new FormData(e.target);
    console.log(data)

    // let dietaryRestrictions = new Set();
    // let foodAllergies = new Set();
    let rsvpUpdates = {};
    rsvpGroup.rsvps.forEach(rsvp => {
      rsvpUpdates[rsvp.id] = {
        dietaryRestrictions: new Set(),
        foodAllergies: new Set(),
        attending: false
      }
    });
    let email = rsvpGroup.email;

    for (const [key, value] of data.entries()) {
      console.log(key, value);
      if(value) {
        const id = key.split("|")[0];

        if(key == "email") {
          email = value;
        }

        if(key.includes("dietaryRestriction")) {
          rsvpUpdates[id].dietaryRestrictions.add(value);
        }

        if(key.includes("foodAllergy")) {
          rsvpUpdates[id].foodAllergies.add(value);
        }

        if(key.includes("vegetarian")) {
          vegetarianRestrictions.forEach(item => rsvpUpdates[id].dietaryRestrictions.add(item))
        }

        if(key.includes("vegan")) {
          veganRestrictions.forEach(item => rsvpUpdates[id].dietaryRestrictions.add(item))
        }

        // name for attending form input is rsvpId|attending
        if(key.includes("attending")) {
          rsvpUpdates[id].attending = value ? true : false;
        }        
      }      
    }
    console.log(JSON.stringify(rsvpUpdates))

    let rsvpsToPost = [];
    for (const [key] of Object.entries(rsvpUpdates)) {
      rsvpsToPost.push({
        id: key,
        dietaryRestrictions: Array.from(rsvpUpdates[key].dietaryRestrictions),
        foodAllergies: Array.from(rsvpUpdates[key].foodAllergies),
        attending: rsvpUpdates[key].attending
      });
    }
    console.log(rsvpsToPost)

    const rsvpGroupToPost = {
      id: rsvpGroup.id,
      rsvp: rsvpsToPost,
      email: email
    }
    console.log(rsvpGroupToPost);
    return rsvpGroupToPost;
}

export default async function Page() {
    console.log('THIS IS PARAMS')
    const params = useParams();
    console.log(params)
    // const res = await fetch("http://api.jenniferanddillonwedding.com:8080/api/update-rsvp-and-rsvp-groups", {
    //     cache: "no-store",
    //     method: "POST",
    //     withCredentials: true,
    //     headers: {
    //         "x-api-key": process.env.API_KEY,
    //         "Content-Type": "application/json"
    //     },
    //     body: params
    // })
    // const payload = await res.json();
    // const status = res.status;
    // console.log(payload)
    let status = null;

    if(status == 200) {
        return (
            <>
                <p>Rsvp successfully updated!.</p>
            </>            
        )
    } else {
        return (
            <>
                <div>
                    <p>Something went wrong. Please notify us and we'll sort you out.</p>
                </div>
            </>
        )        
    }
}