import React from "react";
import { Map, TileLayer, GeoJSON } from "react-leaflet";
import "./HospitalsMap.css";
import { HospitalMarker } from "../HospitalMarker/HospitalMarker";
import data from "../../../assets/json/perifereies-ellados.json";

export function HospitalsMap({ hospitals, handleClick }) {
	const center = [38.664896, 23.318018];
	const zoom = 7;

	function showName(feature, layer) {
		if (feature.properties && feature.properties.PER) {
			layer.bindPopup(feature.properties.PER);
		}
	}

	return (
		<Map className="hospitals-map" center={center} zoom={zoom}>
			<TileLayer
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>
			<GeoJSON
				data={data}
				color="black"
				fillColor="blue"
				onEachFeature={showName}
			/>
			{hospitals.map((hospital) => {
				return <HospitalMarker hospital={hospital} key={hospital.id} handleClick={handleClick} />;
			})}
		</Map>
	);
}
