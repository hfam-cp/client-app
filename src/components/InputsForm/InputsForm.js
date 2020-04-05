import React from "react";
import {
	Form,
	FormGroup,
	Label,
	Input,
	Col,
	Row,
	CardFooter,
	Card,
	CardBody,
	CardHeader,
	Button,
	UncontrolledTooltip,
} from "reactstrap";

import { useForm } from "../../hooks/useForm";
import { useHistory, useParams } from "react-router";

export function InputsForm(props) {
	const {id} = useParams();
	const hist = useHistory();
	const initialState = {
		population: 100000,
		hospitalMarketShare: 0.15,
		currentHospitalized: 100,
		dateOfFirstHospitalizedCase: Date.now(),
		socialDistancing: 0.2,
		hospitalizationPercent: 0.1,
		icuNeedPercent: 0.15,
		ventilationNeedPercent: 0.1,
		infectiousDays: 7,
		averageHospitalLengthOfStay: 14,
		averageDaysInICU: 14,
		averageDaysOnVentilator: 14,
		numberOfDaysToProject: 7,
	};
	const { values, handleChange, handleSubmit } = useForm(
		submit,
		initialState
	);

	function submit() {
		fetch("http://hfam.team/api/predictioninputs/", {
			method: "POST",
			mode: "cors",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(values),
		})
			.then((res) => res.json())
			.then((json) => {
				const path = "/admin/outputs/"+ json.id + "?hospitalId=" + id;
				console.log(path);
				hist.push(path)
			} )
			.catch((err) => console.log(err));
	}

	return (
		<div className="content">
			<Row>
				<Col md="12">
					<Card>
						<CardHeader>
							<h5 className="title">Αλλαγή Παραμέτρων</h5>
						</CardHeader>
						<CardBody>
							<Form onSubmit={handleSubmit} id="inputsForm">
								<Row>
									<Col className="pr-md-1" md="5">
										<FormGroup>
											<Label>Πληθυσμός</Label>
											<Input
												type="number"
												name="population"
												required
												onChange={handleChange}
												value={values.population}
											/>
										</FormGroup>
									</Col>
									<Col className="px-md-1" md="3">
										<FormGroup>
											<Label>
												Πιθανότητα εισαγωγής στο
												Νοσοκομείου
											</Label>
											<Input
												type="range"
												min={0}
												max={1}
												step={0.1}
												name="hospitalMarketShare"
												required
												onChange={handleChange}
												value={
													values.hospitalMarketShare
												}
											/>
											<UncontrolledTooltip
												placement="top"
												target="input[name='hospitalMarketShare']"
											>
												{values.hospitalMarketShare *
													100}
											</UncontrolledTooltip>
										</FormGroup>
									</Col>
									<Col className="pl-md-1" md="4">
										<FormGroup>
											<Label>
												Αριθμός ατόμων σε νοσοκομεία
											</Label>
											<Input
												value={values.currentHospitalized}
												type="number"
												name="currentHospitalized"
												required
												onChange={handleChange}
											/>
										</FormGroup>
									</Col>
								</Row>
								<Row>
									<Col className="pr-md-1" md="6">
										<FormGroup>
											<Label>
												Ημερομηνία πρώτης εισαγωγής
											</Label>
											<Input
												type="date"
												name="dateOfFirstHospitalizedCase"
												required
												onChange={handleChange}
											/>
										</FormGroup>
									</Col>
									<Col className="pl-md-1" md="6">
										<FormGroup>
											<Label>
												Κοινωνική αποστασιοποίηση
											</Label>
											<Input
												value={values.socialDistancing}
												type="range"
												min={0}
												max={1}
												step={0.1}
												name="socialDistancing"
												required
												onChange={handleChange}
											/>
											<UncontrolledTooltip
												placement="top"
												target="input[name='socialDistancing']"
											>
												{values.socialDistancing * 100}
											</UncontrolledTooltip>
										</FormGroup>
									</Col>
								</Row>
								<Row>
									<Col md="12">
										<FormGroup>
											<Label>Ποσοστό εισαγωγής</Label>
											<Input
												value={values.hospitalizationPercent}
												type="range"
												min={0}
												max={1}
												step={0.1}
												name="hospitalizationPercent"
												required
												onChange={handleChange}
											/>
											<UncontrolledTooltip
												placement="top"
												target="input[name='hospitalizationPercent']"
											>
												{values.hospitalizationPercent *
													100}
											</UncontrolledTooltip>
										</FormGroup>
									</Col>
								</Row>
								<Row>
									<Col className="pr-md-1" md="4">
										<FormGroup>
											<Label>
												Ποσοστό που χρειάζονται ΜΕΘ
											</Label>
											<Input
												value={values.icuNeedPercent}
												type="range"
												min={0}
												max={1}
												step={0.1}
												name="icuNeedPercent"
												required
												onChange={handleChange}
											/>
											<UncontrolledTooltip
												placement="top"
												target="input[name='icuNeedPercent']"
											>
												{values.icuNeedPercent * 100}
											</UncontrolledTooltip>
										</FormGroup>
									</Col>
									<Col className="px-md-1" md="4">
										<FormGroup>
											<Label>
												Ποσοστό που χρειάζονται
												αναπνευστήρα
											</Label>
											<Input
												value={values.ventilationNeedPercent}
												type="range"
												min={0}
												max={1}
												step={0.1}
												name="ventilationNeedPercent"
												required
												onChange={handleChange}
											/>
											<UncontrolledTooltip
												placement="top"
												target="input[name='ventilationNeedPercent']"
											>
												{values.ventilationNeedPercent *
													100}
											</UncontrolledTooltip>
										</FormGroup>
									</Col>
									<Col className="pl-md-1" md="4">
										<FormGroup>
											<Label>
												Ημέρες Μεταδοτικότητας
											</Label>
											<Input
												type="number"
												value={values.infectiousDays}
												name="infectiousDays"
												required
												onChange={handleChange}
											/>
										</FormGroup>
									</Col>
								</Row>
								<Row>
									<Col className="pr-md-1" md="4">
										<FormGroup>
											<Label>
												Μέση διαμονή σε νοσοκομείο
											</Label>
											<Input
												value={values.averageHospitalLengthOfStay}
												type="number"
												min={0}
												max={1000}
												name="averageHospitalLengthOfStay"
												required
												onChange={handleChange}
											/>
										</FormGroup>
									</Col>
									<Col className="px-md-1" md="4">
										<FormGroup>
											<Label>Μέση διαμονή σε ΜΕΘ</Label>
											<Input
												value={values.averageDaysInICU}
												type="number"
												min={0}
												max={1000}
												name="averageDaysInICU"
												required
												onChange={handleChange}
											/>
										</FormGroup>
									</Col>
									<Col className="pl-md-1" md="4">
										<FormGroup>
											<Label>
												Μέση διαμονή σε αναπνευστήρα
											</Label>
											<Input
												value={values.averageDaysOnVentilator}
												type="number"
												min={0}
												max={1000}
												name="averageDaysOnVentilator"
												required
												onChange={handleChange}
											/>
										</FormGroup>
									</Col>
								</Row>
								<Row>
									<Col md={12}>
										<FormGroup>
											<Label>Μέρες προσομοίωσης</Label>
											<Input
												value={values.numberOfDaysToProject}
												type="number"
												min={1}
												name="numberOfDaysToProject"
												required
												onChange={handleChange}
											/>
										</FormGroup>
									</Col>
								</Row>
							</Form>
						</CardBody>
						<CardFooter>
							<Button
								className="btn-fill"
								color="info"
								type="submit"
								form="inputsForm"
							>
								Save
							</Button>
						</CardFooter>
					</Card>
				</Col>
			</Row>
		</div>
	);
}
