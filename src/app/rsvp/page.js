'use client'
 
import { useState } from 'react'
 
export default function Page() {
  const [message, setMessage] = useState('')
 
  async function onCreate(formData) {
    const res = await fetch('http://localhost:3000/api/rsvp', {
		method: 'post',
		body: JSON.stringify({"TEST": 1}),
		headers: {
			'Content-Type': 'application/json'
		},
	});
	setMessage(JSON.stringify(await res.json()))
	console.log(JSON.stringify(res));
  }
 
  return (
    <form action={onCreate}>
      <input type="text" name="item" />
      <button type="submit">Add</button>
      <p>{message}</p>
    </form>
  )
}