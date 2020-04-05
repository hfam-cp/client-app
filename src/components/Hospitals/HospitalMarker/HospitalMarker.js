import React from "react";
import { Marker, Popup } from "react-leaflet";
import { HospitalPopupDetails } from "../HospitalDetails/HospitalPopupDetails";

export function HospitalMarker({ hospital: { id, latLong, ...childProps }, handleClick }) {
	const passedProps = {...childProps, id};
	return (
		<Marker onClick={() => handleClick(id)} position={latLong.split(",")}>
			<Popup>
				<HospitalPopupDetails {...passedProps} />
			</Popup>
		</Marker>
	);
}
