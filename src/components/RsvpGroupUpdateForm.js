//'use client'
import React from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default async function RsvpGroupUpdateForm(props) {
    const vegetarianRestrictions = [
        "NO_RED_MEAT",
        "NO_CHICKEN",
        "NO_FISH",
        "NO_PORK",
    ];
    const veganRestrictions = vegetarianRestrictions.concat([
        "NO_EGGS",
        "NO_DAIRY",
    ]);
    console.log("THIS IS RSVP GROUP");
    console.log(props.rsvpGroup);
    const router = useRouter();

    async function handleSubmit(e) {
        e.preventDefault();
        console.log("FORM SUBMITTED");

        // Form input of type "checkbox" will only contain entries for items that are "checked"
        const data = new FormData(e.target);
        console.log(data);

        let rsvpUpdates = {};
        props.rsvpGroup.rsvps.forEach((rsvp) => {
            rsvpUpdates[rsvp.id] = {
                dietaryRestrictions: new Set(),
                foodAllergies: new Set(),
                attending: false,
            };
        });
        let email = props.rsvpGroup.email;
        console.log(email);

        for (const [key, value] of data.entries()) {
            console.log(key, value);
            if (value) {
                const id = key.split("|")[0];

                if (key == "email") {
                    email = value;
                }

                if (key.includes("dietaryRestriction")) {
                    rsvpUpdates[id].dietaryRestrictions.add(value);
                }

                if (key.includes("foodAllergy")) {
                    rsvpUpdates[id].foodAllergies.add(value);
                }

                if (key.includes("vegetarian")) {
                    vegetarianRestrictions.forEach((item) =>
                        rsvpUpdates[id].dietaryRestrictions.add(item)
                    );
                }

                if (key.includes("vegan")) {
                    veganRestrictions.forEach((item) =>
                        rsvpUpdates[id].dietaryRestrictions.add(item)
                    );
                }

                // name for attending form input is rsvpId|attending
                if (key.includes("attending")) {
                    rsvpUpdates[id].attending = value ? true : false;
                }
            }
        }
        console.log(JSON.stringify(rsvpUpdates));

        let rsvpsToPost = [];
        for (const [key] of Object.entries(rsvpUpdates)) {
            rsvpsToPost.push({
                id: Number(key),
                dietaryRestrictions: Array.from(
                    rsvpUpdates[key].dietaryRestrictions
                ).sort(),
                foodAllergies: Array.from(
                    rsvpUpdates[key].foodAllergies
                ).sort(),
                attending: rsvpUpdates[key].attending,
            });
        }
        console.log(rsvpsToPost);

        const rsvpGroupToPost = [
            {
                id: props.rsvpGroup.id,
                rsvps: rsvpsToPost,
                email: email,
            },
        ];

        const res = await fetch("/api/updateRsvpGroupAndRsvps", {
            cache: "no-store",
            method: "POST",
            body: JSON.stringify(rsvpGroupToPost),
        });

        const status = res.status;
        router.push(
            `${process.env.NEXT_PUBLIC_HOST}/rsvp/group/submitted?status=${status}`
        );
    }

    // Return true if dietaryRestrictions has all entries to vegetarianRestrictions, else false.
    const isVegetarian = (dietaryRestrictions) => {
        return (
            dietaryRestrictions &&
			vegetarianRestrictions.every((vegetarianRestriction) =>
			    dietaryRestrictions.includes(vegetarianRestriction)
			)
        );
    };

    // Return true if dietaryRestrictions has all entries to veganRestrictions, else false.
    const isVegan = (dietaryRestrictions) => {
        return (
            dietaryRestrictions &&
			veganRestrictions.every((veganRestriction) =>
			    dietaryRestrictions.includes(veganRestriction)
			)
        );
    };

    return (
        <>
            <p>Please fill out what best describes your attending party.</p>
            <form
                onSubmit={(e) => {
                    handleSubmit(e);
                }}>
                <div>
                    <input
                        type="text"
                        name="email"
                        className="border-solid border-2 border-red-500"
                        defaultValue={props.rsvpGroup.email}></input>
                    <label htmlFor="email">What is the group's email?</label>
                </div>
                {props.rsvpGroup.rsvps?.map((rsvp) => (
                    <div
                        key={rsvp.id}
                        className="border-solid border-2 border-sky-500">
                        <div>{rsvp.name}</div>
                        <div>
                            <input
                                type="checkbox"
                                id={rsvp.id}
                                name={`${rsvp.id}|attending`}
                                defaultChecked={
                                    rsvp.attending ? "checked" : ""
                                }></input>
                            <label htmlFor={`${rsvp.id}|attending`}>
								attending?
                            </label>
                        </div>

                        <div className="dietary-restrictions">
                            <div>
                                <input
                                    type="checkbox"
                                    id="vegetarian"
                                    name={`${rsvp.id}|vegetarian`}
                                    defaultChecked={
                                        isVegetarian(rsvp.dietaryRestrictions)
                                            ? "checked"
                                            : ""
                                    }></input>
                                <label htmlFor="vegetarian">Vegetarian</label>
                            </div>
                            <div>
                                <input
                                    type="checkbox"
                                    id="vegan"
                                    name={`${rsvp.id}|vegan`}
                                    defaultChecked={
                                        isVegan(rsvp.dietaryRestrictions)
                                            ? "checked"
                                            : ""
                                    }></input>
                                <label htmlFor="vegan">Vegan</label>
                            </div>
                            <div>
                                <input
                                    type="checkbox"
                                    id="dietaryRestriction1"
                                    name={`${rsvp.id}|dietaryRestriction1`}
                                    value="NO_RED_MEAT"
                                    defaultChecked={
                                        rsvp.dietaryRestrictions &&
										rsvp.dietaryRestrictions.includes(
										    "NO_RED_MEAT"
										)
                                            ? "checked"
                                            : ""
                                    }></input>
                                <label htmlFor="dietaryRestriction1">
									No Red Meat
                                </label>
                            </div>
                            <div>
                                <input
                                    type="checkbox"
                                    id="dietaryRestriction2"
                                    name={`${rsvp.id}|dietaryRestriction2`}
                                    value="NO_CHICKEN"
                                    defaultChecked={
                                        rsvp.dietaryRestrictions &&
										rsvp.dietaryRestrictions.includes(
										    "NO_CHICKEN"
										)
                                            ? "checked"
                                            : ""
                                    }></input>
                                <label htmlFor="dietaryRestriction2">
									No Chicken
                                </label>
                            </div>
                            <div>
                                <input
                                    type="checkbox"
                                    id="dietaryRestriction3"
                                    name={`${rsvp.id}|dietaryRestriction3`}
                                    value="NO_FISH"
                                    defaultChecked={
                                        rsvp.dietaryRestrictions &&
										rsvp.dietaryRestrictions.includes(
										    "NO_FISH"
										)
                                            ? "checked"
                                            : ""
                                    }></input>
                                <label htmlFor="dietaryRestriction3">
									No Fish
                                </label>
                            </div>
                            <div>
                                <input
                                    type="checkbox"
                                    id="dietaryRestriction4"
                                    name={`${rsvp.id}|dietaryRestriction4`}
                                    value="NO_EGGS"
                                    defaultChecked={
                                        rsvp.dietaryRestrictions &&
										rsvp.dietaryRestrictions.includes(
										    "NO_EGGS"
										)
                                            ? "checked"
                                            : ""
                                    }></input>
                                <label htmlFor="dietaryRestriction4">
									No Eggs
                                </label>
                            </div>
                            <div>
                                <input
                                    type="checkbox"
                                    id="dietaryRestriction5"
                                    name={`${rsvp.id}|dietaryRestriction5`}
                                    value="NO_PORK"
                                    defaultChecked={
                                        rsvp.dietaryRestrictions &&
										rsvp.dietaryRestrictions.includes(
										    "NO_PORK"
										)
                                            ? "checked"
                                            : ""
                                    }></input>
                                <label htmlFor="dietaryRestriction5">
									No Pork
                                </label>
                            </div>
                            <div>
                                <input
                                    type="checkbox"
                                    id="dietaryRestriction6"
                                    name={`${rsvp.id}|dietaryRestriction6`}
                                    value="NO_DAIRY"
                                    defaultChecked={
                                        rsvp.dietaryRestrictions &&
										rsvp.dietaryRestrictions.includes(
										    "NO_DAIRY"
										)
                                            ? "checked"
                                            : ""
                                    }></input>
                                <label htmlFor="dietaryRestriction6">
									No Dairy
                                </label>
                            </div>
                        </div>

                        <div className="food-allergies">
                            <p>
								Please indicate any food allergies your party
								may have.
                            </p>
                            <div>
                                <input
                                    type="checkbox"
                                    name={`${rsvp.id}|foodAllergy1`}
                                    value="PEANUTS"
                                    defaultChecked={
                                        rsvp.foodAllergies &&
										rsvp.foodAllergies.includes("PEANUTS")
                                            ? "checked"
                                            : ""
                                    }></input>
                                <label htmlFor={`${rsvp.id}|foodAllergy1`}>
									Peanuts
                                </label>
                            </div>
                            <div>
                                <input
                                    type="checkbox"
                                    name={`${rsvp.id}|foodAllergy2`}
                                    value="FISH"
                                    defaultChecked={
                                        rsvp.foodAllergies &&
										rsvp.foodAllergies.includes("FISH")
                                            ? "checked"
                                            : ""
                                    }></input>
                                <label htmlFor={`${rsvp.id}|foodAllergy2`}>
									Fish
                                </label>
                            </div>
                            <div>
                                <input
                                    type="checkbox"
                                    name={`${rsvp.id}|foodAllergy3`}
                                    value="EGGS"
                                    defaultChecked={
                                        (rsvp.foodAllergies &&
											rsvp.foodAllergies.includes(
											    "EGGS"
											)) ||
										rsvp.dietaryRestrictions.includes(
										    "NO_EGGS"
										)
                                            ? "checked"
                                            : ""
                                    }></input>
                                <label htmlFor={`${rsvp.id}|foodAllergy3`}>
									Eggs
                                </label>
                            </div>
                            <div>
                                <input
                                    type="checkbox"
                                    name={`${rsvp.id}|foodAllergy4`}
                                    value="SOY_PRODUCTS"
                                    defaultChecked={
                                        rsvp.foodAllergies &&
										rsvp.foodAllergies.includes(
										    "SOY_PRODUCTS"
										)
                                            ? "checked"
                                            : ""
                                    }></input>
                                <label htmlFor={`${rsvp.id}|foodAllergy4`}>
									Soy Products
                                </label>
                            </div>
                            <div>
                                <input
                                    type="checkbox"
                                    name={`${rsvp.id}|foodAllergy5`}
                                    value="DAIRY"
                                    defaultChecked={
                                        (rsvp.foodAllergies &&
											rsvp.foodAllergies.includes(
											    "DAIRY"
											)) ||
										rsvp.dietaryRestrictions.includes(
										    "NO_DAIRY"
										)
                                            ? "checked"
                                            : ""
                                    }></input>
                                <label htmlFor={`${rsvp.id}|foodAllergy5`}>
									Dairy
                                </label>
                            </div>
                            <div>
                                <input
                                    type="checkbox"
                                    name={`${rsvp.id}|foodAllergy6`}
                                    value="TREE_NUTS"
                                    defaultChecked={
                                        rsvp.foodAllergies &&
										rsvp.foodAllergies.includes("TREE_NUTS")
                                            ? "checked"
                                            : ""
                                    }></input>
                                <label htmlFor={`${rsvp.id}|foodAllergy6`}>
									Tree Nuts
                                </label>
                            </div>
                            <div>
                                <input
                                    type="checkbox"
                                    name={`${rsvp.id}|foodAllergy7`}
                                    value="MUSHROOM"
                                    defaultChecked={
                                        rsvp.foodAllergies &&
										rsvp.foodAllergies.includes("MUSHROOM")
                                            ? "checked"
                                            : ""
                                    }></input>
                                <label htmlFor={`${rsvp.id}|foodAllergy7`}>
									Mushroom
                                </label>
                            </div>
                        </div>
                    </div>
                ))}
                <input type="submit" value="Submit"></input>
            </form>
        </>
    );
}
