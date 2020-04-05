import React, { useState, useEffect } from "react";
import { OutputsTable } from "./OutputsTable";

import {
	Row,
	Col,
	Card,
	CardBody,
	CardHeader,
	CardTitle,
	ButtonGroup,
	Button,
} from "reactstrap";

import classNames from "classnames";

import { LineChart } from "./LineChart";

import { useParams, useLocation } from "react-router-dom";

export function SimulationOutputs() {
	const { hospitalId } = useLocation().search;
	console.log("hospitalId is: ", hospitalId);

	const { id: inputId } = useParams();
	const [data, setData] = useState(null);
	const [chartData, setChartData] = useState({
		datasetLabel: "empty",
		labels: [],
		data: [],
	});
	const [admitted, setAdmitted] = useState({});
	const [ventilated, setVentilated] = useState([]);
	const [hospitalized, setHospitalized] = useState([]);
	const [inICU, setInICU] = useState([]);
	const [labels, setLabels] = useState([]);

	useEffect(() => {
		if (data) {
			console.log("data is:", data);
			
			const { admittedPatients } = data;
			const admitted = JSON.parse(admittedPatients);
			setAdmitted((prev) => admitted);
			console.log(admitted);

			const { day, icu, ventilated, hospitalized } = admitted;

			setLabels((prev) => Object.keys(day));

			setHospitalized(
				Object.values(hospitalized).map((elem) => Math.round(elem))
			);

			setVentilated(
				Object.values(ventilated).map((elem) => Math.round(elem))
			);

			setInICU(Object.values(icu).map((elem) => Math.round(elem)));

			setChartData({datasetLabel: "Νοσηλευόμενοι", labels: labels, data: hospitalized});
		}
	}, [data]);

	useEffect(() => {
		fetch("http://hfam.team/api/predictionoutputs/input/" + inputId)
			.then((res) => res.json())
			.then((json) => {
				setData((prev) => json);
			})
			.catch((err) => console.log(err));
	}, [inputId]);

	console.log(admitted);

	return (
		<div className="content">
			<Row>
				<Col xs="12">
					<Card className="card-chart">
						<CardHeader>
							<Row>
								<Col className="text-left" sm="6">
									<h5 className="card-category">
										Αποτελέσματα
									</h5>
									<CardTitle tag="h2">Νοσηλευόμενοι</CardTitle>
								</Col>
								<Col sm="6">
									<ButtonGroup
										className="btn-group-toggle float-right"
										data-toggle="buttons"
									>
										<Button
											color="info"
											id="0"
											size="sm"
											tag="label"
											className={classNames(
												"btn-simple",
												{
													active:
														chartData.datasetLabel ===
														"Νοσηλευόμενοι",
												}
											)}
											onClick={() =>
												setChartData((prev) => ({
													datasetLabel:
														"Νοσηλευόμενοι",
													labels: labels,
													data: hospitalized,
												}))
											}
										>
											<input
												defaultChecked
												name="options"
												type="radio"
											/>
											<span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
												Νοσηλευόμενοι
											</span>
											<span className="d-block d-sm-none">
												<i className="tim-icons icon-single-02" />
											</span>
										</Button>
										<Button
											color="info"
											id="1"
											size="sm"
											tag="label"
											className={classNames(
												"btn-simple",
												{
													active:
														chartData.datasetLabel ===
														"Σε αναπνευστήρα",
												}
											)}
											onClick={() =>
												setChartData((prev) => ({
													datasetLabel:
														"Σε αναπνευστήρα",
													labels: labels,
													data: ventilated,
												}))
											}
										>
											<input
												name="options"
												type="radio"
											/>
											<span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
												Σε αναπνευστήρα
											</span>
											<span className="d-block d-sm-none">
												<i className="tim-icons icon-gift-2" />
											</span>
										</Button>
										<Button
											color="info"
											id="2"
											size="sm"
											tag="label"
											className={classNames(
												"btn-simple",
												{
													active:
														chartData.datasetLabel ===
														"Σε ΜΕΘ",
												}
											)}
											onClick={() =>
												setChartData((prev) => ({
													datasetLabel: "Σε ΜΕΘ",
													labels: labels,
													data: inICU,
												}))
											}
										>
											<input
												name="options"
												type="radio"
											/>
											<span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
												Σε ΜΕΘ
											</span>
											<span className="d-block d-sm-none">
												<i className="tim-icons icon-tap-02" />
											</span>
										</Button>
									</ButtonGroup>
								</Col>
							</Row>
						</CardHeader>
						<CardBody>
							<div className="chart-area">
								<LineChart
									datasetLabel={chartData.datasetLabel}
									labels={chartData.labels}
									data={chartData.data}
								/>
							</div>
						</CardBody>
					</Card>
				</Col>
			</Row>
			<Row>
				<Col md="12">
					<Card>
						<CardHeader>
							{/* <CardTitle tag="h4">{hospital.name}</CardTitle> */}
						</CardHeader>
						<CardBody>
							<OutputsTable {...admitted} />
						</CardBody>
					</Card>
				</Col>
			</Row>
		</div>
	);
}
