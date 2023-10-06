// "use client"

//import { useState } from "react"

export default function Page() {
	// const [message, setMessage] = useState("")
	// const [status, setStatus] = useState("")

	// async function onCreate(formData) {
	// 	const res = await fetch("http://18.119.117.211:8080/api/rsvp", {
	// 		method: "post",
	// 		body: JSON.stringify({ passcode: "abcde" }),
	// 		headers: {
	// 			"Content-Type": "application/json"
	// 		},
	// 	})

	// 	// const res = await fetch('http://localhost:3000/api/rsvp', {
	// 	//   method: 'post',
	// 	//   body: JSON.stringify({"passcode": "abcde"}),
	// 	//   headers: {
	// 	//     'Content-Type': 'application/json'
	// 	//   },
	// 	// });
	// 	const myObj = await res.json();
	// 	const status = res.status;
	// 	setStatus(JSON.stringify(status))
	// 	// setMessage(myObj.message);
	// 	setMessage(JSON.stringify(myObj))
	// 	//setMessage(JSON.stringify(await res.json()))
	// 	console.log(JSON.stringify(res))
	// }

	return (
		// <form action={onCreate}>
		// 	<input type="text" name="item" />
		// 	<button type="submit">Add</button>
		// 	<p>{message}</p>
		// 	<div>{status}</div>
		// </form>

		<div>
			<p>If you're responding for you and a guest (or your family), you'll be able to RSVP for your entire group.</p>
			<input class="border-red" type="text" name="Full Name"></input>
		</div>
	)
}
