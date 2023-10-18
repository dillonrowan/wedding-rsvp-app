'use client'
import React from 'react';
import { useState } from 'react';
import SearchText from "./SearchText"
import { useRouter, usePathname, redirect } from "next/navigation"
import Link from '../../node_modules/next/link'

export default function SearchRsvpByNameForm() {
	const [groupSearchInput, setGroupSearchInput] = useState('');
	const router = useRouter();
	const path = `rsvp/group/search/${groupSearchInput}`;

	const handleSubmit = (e) => {
		e.preventDefault();
		router.push(`${process.env.NEXT_PUBLIC_HOST}/` + path)
	}
	

	return (
		<div>
			<form onSubmit={(e) => { handleSubmit(e) }}>
				<SearchText handleInput={setGroupSearchInput}/>
				<Link type='submit' title='Submit' href={path}>HELLO</Link>
			</form>
		</div>
	)
}
