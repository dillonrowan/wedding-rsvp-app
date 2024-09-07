"use client";
import React, { useState, useEffect, useFormState } from "react";
import { useRouter } from "next/navigation";
import SubmitButton from "./SubmitButton";
import DeleteButton from "./DeleteButton";
import FloorFoliage from "./FloorFoliage";
import DeleteConfirmModal from "@/components/DeleteConfirmModal";
import AddPersonModal from "@/components/AddPersonModal";
import AddButton from "./AddButton";
import { revalidatePath } from "next/cache";


export default function RsvpGroupUpdateForm(props) {
    const [isShowingDeleteModal, setIsShowingDeleteModal] = useState(false);
    const [stateUpdateKey, setStateUpdateKey] = useState(0);
    const [namesToRemove, setNamesToRemove] = useState(new Set());
    const [isShowingAddModal, setIsShowingAddModal] = useState(false);

    const closeDeleteModal = () => {
        setIsShowingDeleteModal(false);
    };

    const openDeleteModal = () => {
        //e.preventDefault();
        //formData = new FormData(e.target);
        setIsShowingDeleteModal(true);
    };

    const closeAddModal = () => {
        setIsShowingAddModal(false);
    };

    const openAddModal = () => {
        setIsShowingAddModal(true);
    };

    const handleRemoveCheckBoxClicked = (e) => {
        console.log("INSIDE HANDLE REMOVE CLICK")
        console.log(e.target.name)
        console.log(e.target.value)
        console.log(e.target.checked)
        if(e.target.checked) {
            console.log("IN THE ON")
            let namesToRemoveTemp = namesToRemove;
            console.log("namesToRemoveTemp", namesToRemoveTemp)
            namesToRemoveTemp.add(e.target.name.split("|")[1]);
            setNamesToRemove(namesToRemoveTemp);
        } else {
            console.log("UNCHECK!")
            let namesToRemoveTemp = namesToRemove;
            namesToRemoveTemp.delete(e.target.name);
            setNamesToRemove(namesToRemoveTemp)
        }        
        setStateUpdateKey(stateUpdateKey + 1);
        console.log(namesToRemove)
    }

    const deleteRsvps = async () => {
        console.log(namesToRemove)
        const data = { groupId: props.rsvpGroup.id, names: Array.from(namesToRemove) };
        return await fetch("/api/deleteRsvps", {
            cache: "no-store",
            method: "POST",
            body: JSON.stringify(data),
        });
    }

    const upsertRsvps = async (rsvps) => {
        return await fetch("/api/upsertRsvps", {
            cache: "no-store",
            method: "POST",
            body: JSON.stringify({groupId: props.rsvpGroup.id, rsvps: rsvps}),
        });
    }

    const handleAddPerson = async (nameToAdd) => {
        setIsShowingAddModal(false);
        let rsvpGroup = props.rsvpGroup;
        rsvpGroup.rsvps.push({
            name: nameToAdd,
            attending: true,
            dietaryRestrictions: [],
            foodAllergies: []
        })
        props.setRsvpData(rsvpGroup)
        
        // const data = { groupId: props.rsvpGroup.id, names: [nameToAdd] };
        // const res = await fetch("/api/addRsvps", {
        //     cache: "no-store",
        //     method: "POST",
        //     body: JSON.stringify(data),
        // });

        // const status = res.status;
        // router.push(
        //     `/rsvp/group/submitted?status=${status}`
        // );
        // setIsShowingAddModal(false);
    };

    useEffect(() => {
        // setIsShowingDeleteModal(true);
    }, [props.rsvpGroup, isShowingDeleteModal]);

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
        console.log(data)
        let rsvpUpserts = {};
        props.rsvpGroup.rsvps.forEach((rsvp, index) => {
            rsvpUpserts[index] = {
                dietaryRestrictions: new Set(),
                foodAllergies: new Set(),
                attending: false,
                name: rsvp.name,
                id: rsvp.id
            };
        });

        for (const [key, value] of data.entries()) {
            console.log("key: ", key);
            console.log("value: ", value);
            const index = key.split("|")[0];
            console.log("AFTER INDEX")
            const guestName = key.split("|")[1];
            console.log("AFTER GUEST NAME")
            rsvpUpserts[index].name = guestName;
            console.log("AFTER UPSERTS")
            if (value) {    

                if (key.includes("dietaryRestriction")) {
                    rsvpUpserts[index].dietaryRestrictions.add(value);
                }

                if (key.includes("foodAllergy")) {
                    rsvpUpserts[index].foodAllergies.add(value);
                }

                if (key.includes("vegetarian")) {
                    vegetarianRestrictions.forEach((item) =>
                        rsvpUpserts[index].dietaryRestrictions.add(item)
                    );
                }

                if (key.includes("vegan")) {
                    veganRestrictions.forEach((item) =>
                        rsvpUpserts[index].dietaryRestrictions.add(item)
                    );
                }

                // name for attending form input is rsvpId|attending
                if (key.includes("attending")) {
                    rsvpUpserts[index].attending = value ? true : false;
                }
            }
        }

        let rsvpsToPost = [];
        for (const [key] of Object.entries(rsvpUpserts)) {
            rsvpsToPost.push({
                id: rsvpUpserts[key].id,
                dietaryRestrictions: Array.from(
                    rsvpUpserts[key].dietaryRestrictions
                ).sort(),
                foodAllergies: Array.from(
                    rsvpUpserts[key].foodAllergies
                ).sort(),
                attending: rsvpUpserts[key].attending,
                name: rsvpUpserts[key].name
            });
        }

        // const rsvpGroupToPost = [
        //     {
        //         id: props.rsvpGroup.id,
        //         rsvps: rsvpsToPost,
        //         email: email,
        //     },
        // ];
        
        let resp = await upsertRsvps(rsvpsToPost);
        if (resp.status != 200) {
            console.error(resp);
            handleErrorPage(resp);
        }

        if (namesToRemove.size > 0) {
            console.log("MADE IT TO DELETE!!!!")
            resp = await deleteRsvps();
            if (resp.status != 200) {
                console.error(resp);
                handleErrorPage(resp);
            }
        }   
        router.push(
            `/rsvp/group/submitted?status=${resp.status}`
        );     
    }

    const handleErrorPage = (resp) => {
        router.push(
            `/rsvp/group/submitted?status=${resp.status}&action=update&statusText=${resp.statusText}`
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
        <>     <div>{namesToRemove.size}</div>
            { isShowingAddModal && <AddPersonModal handleModalClose={closeAddModal} handleAdd={handleAddPerson} /> }   
              
            <form
                className="accent-purple-100 font-cormorant"
                onSubmit={(e) => {
                    handleSubmit(e);
                }}>
                { isShowingDeleteModal && <DeleteConfirmModal handleModalClose={closeDeleteModal} /> }   
                <div className="text-centertext-xl">
                    <p className="font-cormorant font-cormorant text-2xl pb-5">Please fill out what best describes your attending party.</p>                   
                </div>
                {props.rsvpGroup.rsvps?.map((rsvp, index) => (
                    <div
                        key={index}
                        className="p-5 mb-10 text-xl border-solid border-2 px-4 py-4 bg-white shadow-xl w-full ">
                        <div className="flex justify-between content-center">
                            <div className="font-cormorant font-bold text-2xl">{rsvp.name}</div>
                            <div>
                                {/* {props.rsvpGroup.modifyGroup && (rsvp.name != props.rsvpGroup.groupLead) ?
                                    <DeleteButton label="Remove" onButtonClick={() => {
                                        openDeleteModal(rsvp.name);
                                    }}/> : null}                                 */}
                                {/* remove input */}
                                {props.rsvpGroup.modifyGroup && (rsvp.name != props.rsvpGroup.groupLead) ?
                                    <div>
                                        <input
                                            className="mr-2 w-5 h-5 cursor-pointer"
                                            type="checkbox" name={`${index}|${rsvp.name}|remove`} onClick={handleRemoveCheckBoxClicked}></input>
                                        
                                        <label className="text-2xl">
                                            Remove
                                        </label>
                                    </div>
                                : null}
                            </div>
                        </div>
                        

                        {/* attending input */}
                        <div>
                            <input
                                className="mr-2 w-5 h-5 cursor-pointer"
                                type="checkbox"
                                id={index}
                                name={`${index}|${rsvp.name}|attending`}
                                defaultChecked={
                                    rsvp.attending ? "checked" : ""
                                }></input>
                            
                            <label className="text-2xl" htmlFor={`${index}|${rsvp.name}|attending`}>
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
                                    name={`${index}|${rsvp.name}|vegetarian`}
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
                                    name={`${index}|${rsvp.name}|vegan`}
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
                                    id="dietaryRestriction5"
                                    name={`${index}|${rsvp.name}|dietaryRestriction5`}
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
                                    name={`${index}|${rsvp.name}|foodAllergy1`}
                                    value="PEANUTS"
                                    defaultChecked={
                                        rsvp.foodAllergies &&
										rsvp.foodAllergies.includes("PEANUTS")
                                            ? "checked"
                                            : ""
                                    }></input>
                                <label className="text-2xl" htmlFor={`${index}|${rsvp.name}|foodAllergy1`}>
									Peanuts
                                </label>
                            </div>
                            <div className="pb-2">
                                <input
                                    className="mr-2 w-5 h-5 cursor-pointer"
                                    type="checkbox"
                                    name={`${index}|${rsvp.name}|foodAllergy4`}
                                    value="SOY_PRODUCTS"
                                    defaultChecked={
                                        rsvp.foodAllergies &&
										rsvp.foodAllergies.includes(
										    "SOY_PRODUCTS"
										)
                                            ? "checked"
                                            : ""
                                    }></input>
                                <label className="text-2xl" htmlFor={`${index}|${rsvp.name}|foodAllergy4`}>
									Soy Products
                                </label>
                            </div>
                            <div className="pb-2">
                                <input
                                    className="mr-2 w-5 h-5 cursor-pointer"
                                    type="checkbox"
                                    name={`${index}|${rsvp.name}|foodAllergy5`}
                                    value="DAIRY"
                                    defaultChecked={isDairyRestricted(rsvp.dietaryRestrictions, rsvp.foodAllergies)}></input>
                                <label className="text-2xl" htmlFor={`${index}|${rsvp.name}|foodAllergy5`}>
									Dairy
                                </label>
                            </div>
                            <div className="pb-2">
                                <input
                                    className="mr-2 w-5 h-5 cursor-pointer"
                                    type="checkbox"
                                    name={`${index}|${rsvp.name}|foodAllergy6`}
                                    value="TREE_NUTS"
                                    defaultChecked={
                                        rsvp.foodAllergies &&
										rsvp.foodAllergies.includes("TREE_NUTS")
                                            ? "checked"
                                            : ""
                                    }></input>
                                <label className="text-2xl" htmlFor={`${index}|${rsvp.name}|foodAllergy6`}>
									Tree Nuts
                                </label>
                            </div>
                            <div>
                                <input
                                    className="mr-2 w-5 h-5 cursor-pointer"
                                    type="checkbox"
                                    name={`${index}|${rsvp.name}|foodAllergy7`}
                                    value="MUSHROOM"
                                    defaultChecked={
                                        rsvp.foodAllergies &&
										rsvp.foodAllergies.includes("MUSHROOM")
                                            ? "checked"
                                            : ""
                                    }></input>
                                <label className="text-2xl" htmlFor={`${index}|${rsvp.name}|foodAllergy7`}>
									Mushroom
                                </label>
                            </div>
                        </div>
                    </div>
                ))}
                { namesToRemove.size > 0 ? <button type="button" onClick={openDeleteModal}>SUBMIT</button> : <SubmitButton label="SUBMIT" /> }
                
                <div className="pt-5">
                    { props.rsvpGroup.modifyGroup ? <AddButton label="+ ADD PERSON" onButtonClick={openAddModal} /> : null }
                </div>
            </form>
            <FloorFoliage />
        </>
    );
}
