import React from "react";
import { useRouter } from "next/navigation";
import SubmitButton from "./SubmitButton";
import Image from "next/image";


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
    const router = useRouter();

    async function handleSubmit(e) {
        e.preventDefault();

        // Form input of type "checkbox" will only contain entries for items that are "checked"
        const data = new FormData(e.target);

        let rsvpUpdates = {};
        props.rsvpGroup.rsvps.forEach((rsvp) => {
            rsvpUpdates[rsvp.id] = {
                dietaryRestrictions: new Set(),
                foodAllergies: new Set(),
                attending: false,
            };
        });
        let email = props.rsvpGroup.email;

        for (const [key, value] of data.entries()) {
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
            `/rsvp/group/submitted?status=${status}`
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

    const isDairyRestricted = (dietaryRestrictions, foodAllergies) => {
        if( (foodAllergies && foodAllergies.includes("DAIRY")) || (dietaryRestrictions && dietaryRestrictions.includes("NO_DAIRY")) ) {
            return "checked";
        }
        return "";
    };

    return (
        <>            
            <form
                className="accent-purple-100 font-cormorant"
                onSubmit={(e) => {
                    handleSubmit(e);
                }}>
                <div className="text-center pb-10 text-xl">
                    <p className="font-cormorant font-cormorant text-2xl pb-5">Please fill out what best describes your attending party.</p>
                    <label className="pr-1" htmlFor="email">What is your attending party's email?</label>
                    <input
                        type="text"
                        name="email"
                        className="px-2 border-solid border-2 rounded"
                        defaultValue={props.rsvpGroup.email}></input>                    
                </div>
                {props.rsvpGroup.rsvps?.map((rsvp) => (
                    <div
                        key={rsvp.id}
                        className="p-5 mb-10 text-xl border-solid border-2 px-4 py-4 bg-white shadow-xl w-full ">
                        <div className="font-cormorant font-bold text-2xl">{rsvp.name}</div>

                        {/* attending input */}
                        <div>
                            <input
                                className="mr-2 w-5 h-5 cursor-pointer"
                                type="checkbox"
                                id={rsvp.id}
                                name={`${rsvp.id}|attending`}
                                defaultChecked={
                                    rsvp.attending ? "checked" : ""
                                }></input>
                            {/* TODO see if you can have store the id in another attribute, so htmlFor can reference a static name, allowing the text being clicked to toggle checked status */}
                            <label className="text-2xl" htmlFor={`${rsvp.id}|attending`}>
                                Attending?
                            </label>
                        </div>
                        
                        {/* start of diet restriction section */}
                        <div className="dietary-restrictions pt-5">
                            <p className="italic">Dietary Restrictions:</p>
                            <div className="pb-2">
                                <input
                                    className="mr-2 w-5 h-5 cursor-pointer"
                                    type="checkbox"
                                    id="vegetarian"
                                    name={`${rsvp.id}|vegetarian`}
                                    defaultChecked={
                                        isVegetarian(rsvp.dietaryRestrictions)
                                            ? "checked"
                                            : ""
                                    }></input>
                                <label className="text-2xl" htmlFor="vegetarian">Vegetarian</label>
                            </div>
                            <div className="pb-2">
                                <input
                                    className="mr-2 w-5 h-5 cursor-pointer"
                                    type="checkbox"
                                    id="vegan"
                                    name={`${rsvp.id}|vegan`}
                                    defaultChecked={
                                        isVegan(rsvp.dietaryRestrictions)
                                            ? "checked"
                                            : ""
                                    }></input>
                                <label className="text-2xl" htmlFor="vegan">Vegan</label>
                            </div>
                            <div className="pb-2">
                                <input
                                    className="mr-2 w-5 h-5 cursor-pointer"
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
                                <label className="text-2xl" htmlFor="dietaryRestriction1">
									No Red Meat
                                </label>
                            </div>
                            <div className="pb-2">
                                <input
                                    className="mr-2 w-5 h-5 cursor-pointer"
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
                                <label className="text-2xl" htmlFor="dietaryRestriction2">
									No Chicken
                                </label>
                            </div>
                            <div className="pb-2">
                                <input
                                    className="mr-2 w-5 h-5 cursor-pointer"
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
                                <label className="text-2xl" htmlFor="dietaryRestriction3">
									No Fish
                                </label>
                            </div>
                            <div className="pb-2">
                                <input
                                    className="mr-2 w-5 h-5 cursor-pointer"
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
                                <label className="text-2xl" htmlFor="dietaryRestriction4">
									No Eggs
                                </label>
                            </div>
                            <div className="pb-2">
                                <input
                                    className="mr-2 w-5 h-5 cursor-pointer"
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
                                <label className="text-2xl" htmlFor="dietaryRestriction5">
									No Pork
                                </label>
                            </div>
                            <div>
                                <input
                                    className="mr-2 w-5 h-5 cursor-pointer"
                                    type="checkbox"
                                    id="dietaryRestriction6"
                                    name={`${rsvp.id}|dietaryRestriction6`}
                                    value="NO_DAIRY"
                                    defaultChecked={isDairyRestricted(rsvp.dietaryRestrictions, rsvp.foodAllergies)}></input>
                                <label className="text-2xl" htmlFor="dietaryRestriction6">
									No Dairy
                                </label>
                            </div>
                        </div>

                        {/* start of food allergy section */}
                        <div className="food-allergies font-cormorant">
                            <p className="pt-10 italic">
								Food Allergies:
                            </p>
                            <div className="pb-2">
                                <input
                                    className="mr-2 w-5 h-5 cursor-pointer"
                                    type="checkbox"
                                    name={`${rsvp.id}|foodAllergy1`}
                                    value="PEANUTS"
                                    defaultChecked={
                                        rsvp.foodAllergies &&
										rsvp.foodAllergies.includes("PEANUTS")
                                            ? "checked"
                                            : ""
                                    }></input>
                                <label className="text-2xl" htmlFor={`${rsvp.id}|foodAllergy1`}>
									Peanuts
                                </label>
                            </div>
                            <div className="pb-2">
                                <input
                                    className="mr-2 w-5 h-5 cursor-pointer"
                                    type="checkbox"
                                    name={`${rsvp.id}|foodAllergy2`}
                                    value="FISH"
                                    defaultChecked={
                                        rsvp.foodAllergies &&
										rsvp.foodAllergies.includes("FISH")
                                            ? "checked"
                                            : ""
                                    }></input>
                                <label className="text-2xl" htmlFor={`${rsvp.id}|foodAllergy2`}>
									Fish
                                </label>
                            </div>
                            <div className="pb-2">
                                <input
                                    className="mr-2 w-5 h-5 cursor-pointer"
                                    type="checkbox"
                                    name={`${rsvp.id}|foodAllergy3`}
                                    value="EGGS"
                                    defaultChecked={
                                        (rsvp.foodAllergies &&
											rsvp.foodAllergies.includes(
											    "EGGS"
											))
                                    }></input>
                                <label className="text-2xl" htmlFor={`${rsvp.id}|foodAllergy3`}>
									Eggs
                                </label>
                            </div>
                            <div className="pb-2">
                                <input
                                    className="mr-2 w-5 h-5 cursor-pointer"
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
                                <label className="text-2xl" htmlFor={`${rsvp.id}|foodAllergy4`}>
									Soy Products
                                </label>
                            </div>
                            <div className="pb-2">
                                <input
                                    className="mr-2 w-5 h-5 cursor-pointer"
                                    type="checkbox"
                                    name={`${rsvp.id}|foodAllergy5`}
                                    value="DAIRY"
                                    defaultChecked={isDairyRestricted(rsvp.dietaryRestrictions, rsvp.foodAllergies)}></input>
                                <label className="text-2xl" htmlFor={`${rsvp.id}|foodAllergy5`}>
									Dairy
                                </label>
                            </div>
                            <div className="pb-2">
                                <input
                                    className="mr-2 w-5 h-5 cursor-pointer"
                                    type="checkbox"
                                    name={`${rsvp.id}|foodAllergy6`}
                                    value="TREE_NUTS"
                                    defaultChecked={
                                        rsvp.foodAllergies &&
										rsvp.foodAllergies.includes("TREE_NUTS")
                                            ? "checked"
                                            : ""
                                    }></input>
                                <label className="text-2xl" htmlFor={`${rsvp.id}|foodAllergy6`}>
									Tree Nuts
                                </label>
                            </div>
                            <div>
                                <input
                                    className="mr-2 w-5 h-5 cursor-pointer"
                                    type="checkbox"
                                    name={`${rsvp.id}|foodAllergy7`}
                                    value="MUSHROOM"
                                    defaultChecked={
                                        rsvp.foodAllergies &&
										rsvp.foodAllergies.includes("MUSHROOM")
                                            ? "checked"
                                            : ""
                                    }></input>
                                <label className="text-2xl" htmlFor={`${rsvp.id}|foodAllergy7`}>
									Mushroom
                                </label>
                            </div>
                        </div>
                    </div>
                ))}
                <SubmitButton label="SUBMIT" />
            </form>
            <Image
                className="rotate-180 podbar -z-10 left-0"
                src="/leaves.webp"
                width={2000}
                height={1000}
                alt=""
            />
        </>
    );
}
