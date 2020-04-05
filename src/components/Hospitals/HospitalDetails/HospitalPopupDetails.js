import React from "react";
import {Link} from "react-router-dom";

export function HospitalPopupDetails({ id, name, capacity, confirmed, cured, admitted, handleClick}) {
	const remaining = capacity - admitted;
	
	return (
		<article>
			<h3>{name}</h3>
			<p>Χωρητικότητα: {capacity}</p>
			<p>Κλίνες σε χρήση: {admitted} </p>
			<p>Κενές Κλίνες: {remaining}</p>

			<Link to={"inputs/" + id}>Παραμετροποίηση</Link>
		</article>
	);
}
