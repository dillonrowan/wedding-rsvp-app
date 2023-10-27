'use client'
import React from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

export default async function Page() {
  const vegetarianRestrictions = ["NO_RED_MEAT", "NO_CHICKEN", "NO_FISH", "NO_PORK"];
  const veganRestrictions = vegetarianRestrictions.concat(["NO_EGGS"]); // TODO: add dairy

  const searchParams = useSearchParams(); 
  const rsvpGroup = JSON.parse(searchParams.get('rsvp-group'));
  const router = useRouter();
 
  
  async function handleSubmit(e) {
		e.preventDefault();
    console.log('FORM SUBMITTED');

    const data = new FormData(e.target);
    console.log(data)

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
    console.log(rsvpGroupToPost)

    updateRsvpGroupAndRsvps(rsvpGroupToPost);
	}

  async function updateRsvpGroupAndRsvps(rsvpGroupToPost) {
    console.log(process.env.API_KEY);
    //TODO: this does not work. key is undefined
    const res = await fetch("http://api.jenniferanddillonwedding.com:8080/api/update-rsvp-and-rsvp-groups", {
        cache: "no-store",
        method: "POST",
        mode: 'no-cors',
        withCredentials: true,
        headers: {
            "x-api-key": process.env.API_KEY,
            "Content-Type": "application/json"
        },
        body: rsvpGroupToPost
    })
    const payload = await res.json();
    const status = res.status;
    console.log(payload);
    console.log(status);
  }

  // Return true if dietaryRestrictions has all entries to vegetarianRestrictions, else false.
  const isVegetarian = (dietaryRestrictions) => {
    return dietaryRestrictions && vegetarianRestrictions.every(vegetarianRestriction => dietaryRestrictions.includes(vegetarianRestriction));
  }

  // Return true if dietaryRestrictions has all entries to veganRestrictions, else false.
  const isVegan = (dietaryRestrictions) => {
    return dietaryRestrictions && veganRestrictions.every(veganRestriction => dietaryRestrictions.includes(veganRestriction));
  }

  return (
    <>
      <p>Please fill out what best describes your attending party.</p> 
      <form onSubmit={(e) => { handleSubmit(e) }}>   
      {/* <form action={`${process.env.NEXT_PUBLIC_HOST}/rsvp/group/update`}>   */}
        <div>          
          <input type="text" name="email" className="border-solid border-2 border-red-500"
            defaultValue={rsvpGroup.email}></input>
          <label htmlFor="email">What is the group's email?</label>
        </div>      
        {rsvpGroup.rsvps?.map((rsvp) => (
          <div key={rsvp.id} className="border-solid border-2 border-sky-500">
            <div>{rsvp.name}</div>
              <div>          
                <input type="checkbox" id={rsvp.id} name={`${rsvp.id}|attending`}
                  defaultChecked={rsvp.attending ? "checked" : ""}></input>
                <label htmlFor={`${rsvp.id}|attending`}>attending?</label>
              </div> 

            <div className="dietary-restrictions">
              <div>          
                <input type="checkbox" id="vegetarian" name={`${rsvp.id}|vegetarian`}
                  defaultChecked={isVegetarian(rsvpGroup.dietaryRestrictions) ? "checked" : ""}></input>
                <label htmlFor="vegetarian">Vegetarian</label>
              </div>        
              <div>
                <input type="checkbox" id="vegan" name={`${rsvp.id}|vegan`}
                  defaultChecked={isVegan(rsvpGroup.dietaryRestrictions) ? "checked" : ""}></input>
                <label htmlFor="vegan">Vegan</label>
              </div>        
              <div>
                <input type="checkbox" id="dietaryRestriction1" name={`${rsvp.id}|dietaryRestriction1`} value="NO_PORK"
                  defaultChecked={rsvpGroup.dietaryRestrictions && rsvpGroup.dietaryRestrictions?.includes("NO_PORK") ? "checked" : ""}></input>
                <label htmlFor="dietaryRestriction1">No Pork</label>
              </div>  
            </div>         

            <div className="food-allergies">
              <p>Please indicate any food allergies your party may have.</p>    
              <div>
                <input type="checkbox" name={`${rsvp.id}|foodAllergy1`} value="PEANUTS"
                  defaultChecked={rsvpGroup.foodAllergies && rsvpGroup.foodAllergies?.includes("PEANUTS") ? "checked" : ""}></input>
                <label htmlFor={`${rsvp.id}|foodAllergy1`}>Peanuts</label>
              </div>   
              <div>
                <input type="checkbox" name={`${rsvp.id}|foodAllergy2`} value="FISH" 
                  defaultChecked={rsvpGroup.foodAllergies && rsvpGroup.foodAllergies?.includes("FISH") ? "checked" : ""}></input>
                <label htmlFor={`${rsvp.id}|foodAllergy2`}>Fish</label>
              </div>
              <div>
                <input type="checkbox" name={`${rsvp.id}|foodAllergy3`} value="EGGS" 
                  defaultChecked={rsvpGroup.foodAllergies && rsvpGroup.foodAllergies?.includes("EGGS") ? "checked" : ""}></input>
                <label htmlFor={`${rsvp.id}|foodAllergy3`}>Eggs</label>
              </div>
              <div>
                <input type="checkbox" name={`${rsvp.id}|foodAllergy4`} value="SOY_PRODUCTS"
                  defaultChecked={rsvpGroup.foodAllergies && rsvpGroup.foodAllergies?.includes("SOY_PRODUCTS") ? "checked" : ""}></input>
                <label htmlFor={`${rsvp.id}|foodAllergy4`}>Soy Products</label>
              </div>
              <div>
                <input type="checkbox" name={`${rsvp.id}|foodAllergy5`} value="DAIRY"
                  defaultChecked={rsvpGroup.foodAllergies && rsvpGroup.foodAllergies?.includes("DAIRY") ? "checked" : ""}></input>
                <label htmlFor={`${rsvp.id}|foodAllergy5`}>Dairy</label>
              </div>
              <div>
                <input type="checkbox" name={`${rsvp.id}|foodAllergy6`} value="TREE_NUTS"
                  defaultChecked={rsvpGroup.foodAllergies && rsvpGroup.foodAllergies?.includes("TREE_NUTS") ? "checked" : ""}></input>
                <label htmlFor={`${rsvp.id}|foodAllergy6`}>Tree Nuts</label>
              </div>
              <div>
                <input type="checkbox" name={`${rsvp.id}|foodAllergy7`} value="MUSHROOM"
                  defaultChecked={rsvpGroup.foodAllergies && rsvpGroup.foodAllergies?.includes("MUSHROOM") ? "checked" : ""}></input>
                <label htmlFor={`${rsvp.id}|foodAllergy7`}>Mushroom</label>
              </div>
            </div>            
          </div> 
        ))}       
        <input type="submit" value="Submit"></input>
      </form>            
    </>
  )
}