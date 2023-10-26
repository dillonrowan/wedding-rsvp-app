'use client'
import React from 'react';
import { useSearchParams } from 'next/navigation';

export default async function Page() {
  const vegetarianRestrictions = ["NO_RED_MEAT", "NO_CHICKEN", "NO_FISH", "NO_PORK"];
  const veganRestrictions = vegetarianRestrictions.concat(["NO_EGGS"]); // TODO: add dairy


  const searchParams = useSearchParams(); 
  const rsvpGroup = JSON.parse(searchParams.get('rsvp-group'));
 
  
  const handleSubmit = (e) => {
		e.preventDefault();
    console.log('FORM SUBMITTED');
    const data = new FormData(e.target);

    let dietaryRestrictions = new Set();
    let foodAllergies = new Set();
    let attendingObj = {};

    for (let [key, value] of data.entries()) {
      console.log(key, value);
      if(value) {

        if(key.includes("dietaryRestriction")) {
          dietaryRestrictions.add(value);
        }

        if(key.includes("foodAllergy")) {
          foodAllergies.add(value);
        }

        if(key == "vegetarian") {
          vegetarianRestrictions.forEach(item => dietaryRestrictions.add(item))
        }

        if(key == "vegan") {
          veganRestrictions.forEach(item => dietaryRestrictions.add(item))
        }

        // name for attending form input is rsvpId|attending
        if(key.includes("attending")) {
          const rsvpId = key.split('|')[0];
          attendingObj[rsvpId] = true;
        }        
      }      
    }
    
    console.log('FORM RESULT')
    console.log(dietaryRestrictions);
    console.log(foodAllergies);
    console.log(attendingObj);

    let rsvpGroupToPost = [{
      id: rsvpGroup.id,
      dietaryRestrictions: Array.from(dietaryRestrictions).sort(),
      foodAllergies: Array.from(foodAllergies).sort()
    }];

    console.log(rsvpGroupToPost)
    
		// //router.push(`${process.env.NEXT_PUBLIC_HOST}/` + path)

    //TODO: prepare rsps to post
    let rsvpsToPost = [];
    rsvpGroup.rsvps.forEach(rsvp => {
      rsvpsToPost.push({
        id: rsvp.id,
        attending: attendingObj[rsvp.id] ? true : false
      })
    })
    console.log(rsvpsToPost)
	}

  // Return true if dietaryRestrictions has all entries to vegetarianRestrictions, else false.
  const isVegetarian = (dietaryRestrictions) => {
    return vegetarianRestrictions.every(vegetarianRestriction => dietaryRestrictions.includes(vegetarianRestriction));
  }

  // Return true if dietaryRestrictions has all entries to veganRestrictions, else false.
  const isVegan = (dietaryRestrictions) => {
    return veganRestrictions.every(veganRestriction => dietaryRestrictions.includes(veganRestriction));
  }

  return (
    <>
      <p>Please fill out what best describes your attending party.</p>

      

      <form onSubmit={(e) => { handleSubmit(e) }}>
        <div>
          {rsvpGroup.rsvps?.map((rsvp) => (                        
              <div key={rsvp.id} className="rsvp-attending-status-row">
                <div>{rsvp.name}</div>
                <div>          
                  <input type="checkbox" id={rsvp.id} name={`${rsvp.id}|attending`}
                    defaultChecked={rsvp.attending ? "checked" : ""}></input>
                  <label htmlFor={`${rsvp.id}|attending`}>attending?</label>
                </div>  
              </div>
          ))}
        </div>

        <div className="dietary-restrictions">
          <div>          
            <input type="checkbox" id="vegetarian" name="vegetarian"
              defaultChecked={isVegetarian(rsvpGroup.dietaryRestrictions) ? "checked" : ""}></input>
            <label htmlFor="vegetarian">Vegetarian</label>
          </div>        
          <div>
            <input type="checkbox" id="vegan" name="vegan"
              defaultChecked={isVegan(rsvpGroup.dietaryRestrictions) ? "checked" : ""}></input>
            <label htmlFor="vegan">Vegan</label>
          </div>        
          <div>
            <input type="checkbox" id="dietaryRestriction1" name="dietaryRestriction1" value="NO_PORK"
              defaultChecked={rsvpGroup.dietaryRestrictions.includes("NO_PORK") ? "checked" : ""}></input>
            <label htmlFor="dietaryRestriction1">No Pork</label>
          </div>  
        </div>         

        <div className="food-allergies">
          <p>Please indicate any food allergies your party may have.</p>    
          <div>
            <input type="checkbox" id="foodAllergy1" name="foodAllergy1" value="PEANUTS"
              defaultChecked={rsvpGroup.foodAllergies.includes("PEANUTS") ? "checked" : ""}></input>
            <label htmlFor="foodAllergy1">Peanuts</label>
          </div>   
          <div>
            <input type="checkbox" id="foodAllergy2" name="foodAllergy2" value="FISH" 
              defaultChecked={rsvpGroup.foodAllergies.includes("FISH") ? "checked" : ""}></input>
            <label htmlFor="foodAllergy2">Fish</label>
          </div>
          <div>
            <input type="checkbox" id="foodAllergy3" name="foodAllergy3" value="EGGS" 
              defaultChecked={rsvpGroup.foodAllergies.includes("EGGS") ? "checked" : ""}></input>
            <label htmlFor="foodAllergy3">Eggs</label>
          </div>
          <div>
            <input type="checkbox" id="foodAllergy3" name="foodAllergy3" value="SOY_PRODUCTS"
              defaultChecked={rsvpGroup.foodAllergies.includes("SOY_PRODUCTS") ? "checked" : ""}></input>
            <label htmlFor="foodAllergy3">Soy Products</label>
          </div>
          <div>
            <input type="checkbox" id="foodAllergy4" name="foodAllergy4" value="DAIRY"
              defaultChecked={rsvpGroup.foodAllergies.includes("DAIRY") ? "checked" : ""}></input>
            <label htmlFor="foodAllergy4">Dairy</label>
          </div>
          <div>
            <input type="checkbox" id="foodAllergy5" name="foodAllergy5" value="TREE_NUTS"
              defaultChecked={rsvpGroup.foodAllergies.includes("TREE_NUTS") ? "checked" : ""}></input>
            <label htmlFor="foodAllergy5">Tree Nuts</label>
          </div>
          <div>
            <input type="checkbox" id="foodAllergy6" name="foodAllergy6" value="MUSHROOM"
              defaultChecked={rsvpGroup.foodAllergies.includes("MUSHROOM") ? "checked" : ""}></input>
            <label htmlFor="foodAllergy6">Mushroom</label>
          </div>
        </div>
        <input type="submit" value="Submit"></input>
      </form>
            
    </>
  )
}