import React, { useState, useEffect } from "react";
import {
	Row,
	Col,
	CardFooter,
} from "reactstrap";
import { InfoCard } from "components/InfoCard/InfoCard";
import { HospitalsMap } from "../HospitalsMap/HospitalsMap";

export function HospitalDashboard(props) {
	const cachedHospitals = [
		{
			id: 1,
			name: "Πανεπιστημιακό ΓΝ Ηρακλείου",
			marketShare: 1,
			currentHospitalized: 243,
			capacity: 739,
			latLong: "35.304163,25.083124",
			confirmed: 10,
			cured: 5,
			admitted: 8,
			region: 13,
			inventory: 1,
		},
		{
			id: 2,
			name: "Πανεπιστημιακό ΓΝ Πατρών",
			marketShare: 1,
			currentHospitalized: 67,
			capacity: 400,
			latLong: "38.294786,21.795078",
			confirmed: 32,
			cured: 6,
			admitted: 24,
			region: 7,
			inventory: 2,
		},
		{
			id: 3,
			name: "ΓΝ Νοσημάτων Θώρακος Αθηνών «Η Σωτηρία»",
			marketShare: 0.5,
			currentHospitalized: 427,
			capacity: 700,
			latLong: "37.995443,23.779517",
			confirmed: 69,
			cured: 34,
			admitted: 50,
			region: 9,
			inventory: 3,
		},
		{
			id: 4,
			name: "Πανεπιστημιακό ΓΝ «Αττικόν»",
			marketShare: 0.5,
			currentHospitalized: 223,
			capacity: 617,
			latLong: "38.016843,23.665223",
			confirmed: 90,
			cured: 34,
			admitted: 43,
			region: 9,
			inventory: 4,
		},
	];

	const [hospitals, setHospitals] = useState(cachedHospitals);

	useEffect(() => {
		fetch("http://hfam.team/api/hospitals")
			.then(res => res.json())
			.then(json => setHospitals(json))
			.catch(err => console.log(err));
	}, []);

	const [selectedHospital, setSelectedHospital] = useState({});
	
	function changeHospital(id) {
		setSelectedHospital((prev) =>
			setSelectedHospital(hospitals.find((el) => el.id === id))
		);
	}

	return (
		<div className="content">
			<Row id="details">
				<InfoCard
					icon="fas fa-head-side-cough"
					description="Επιβαιβεωμένα"
					info={selectedHospital.confirmed}
					footer={<CardFooter></CardFooter>}
				/>
				<InfoCard
					icon="fas fa-bed"
					description="Διασωληνωμένοι"
					info={selectedHospital.admitted}
					footer={<CardFooter></CardFooter>}
				/>
				<InfoCard
					icon="fas fa-first-aid"
					description="Θεραπευμένοι"
					info={selectedHospital.cured}
					footer={<CardFooter></CardFooter>}
				/>
			</Row>
			<Row>
				<Col md={8}>
					<HospitalsMap
						hospitals={hospitals}
						handleClick={changeHospital}
					></HospitalsMap>
				</Col>
			</Row>
		</div>
	);
}
