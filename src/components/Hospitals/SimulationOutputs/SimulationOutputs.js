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
import { Line } from "react-chartjs-2";

import { useParams } from "react-router-dom";

export function SimulationOutputs() {
	const output = {
		id: 8,
		dateTime: "2020-04-05T00:15:50.537823Z",
		admittedPatients:
			'{"day":{"0":-3,"1":-2,"2":-1,"3":0,"4":1,"5":2,"6":3,"7":4,"8":5,"9":6,"10":7},"date":{"0":1585699200000,"1":1585785600000,"2":1585872000000,"3":1585958400000,"4":1586044800000,"5":1586131200000,"6":1586217600000,"7":1586304000000,"8":1586390400000,"9":1586476800000,"10":1586563200000},"hospitalized":{"0":null,"1":1.1428571429,"2":2.2839716273,"3":4.5589908791,"4":7.2626499364,"5":12.7673970188,"6":22.3041994632,"7":38.5358613448,"8":65.2963989412,"9":106.9369946831,"10":165.1134598062},"icu":{"0":null,"1":1.7142857143,"2":3.425957441,"3":6.8384863187,"4":10.8939749047,"5":19.1510955282,"6":33.4562991947,"7":57.8037920172,"8":97.9445984118,"9":160.4054920246,"10":247.6701897094},"ventilated":{"0":null,"1":1.1428571429,"2":2.2839716273,"3":4.5589908791,"4":7.2626499364,"5":12.7673970188,"6":22.3041994632,"7":38.5358613448,"8":65.2963989412,"9":106.9369946831,"10":165.1134598062}}',
		census:
			'{"day":{"0":-3,"1":-2,"2":-1,"3":0,"4":1,"5":2,"6":3,"7":4,"8":5,"9":6,"10":7},"date":{"0":1585699200000,"1":1585785600000,"2":1585872000000,"3":1585958400000,"4":1586044800000,"5":1586131200000,"6":1586217600000,"7":1586304000000,"8":1586390400000,"9":1586476800000,"10":1586563200000},"hospitalized":{"0":null,"1":1.1428571429,"2":3.4268287702,"3":7.9858196493,"4":15.2484695858,"5":28.0158666046,"6":50.3200660677,"7":88.8559274125,"8":154.1523263537,"9":261.0893210368,"10":426.2027808431},"icu":{"0":null,"1":1.7142857143,"2":5.1402431553,"3":11.978729474,"4":22.8727043786,"5":42.0237999068,"6":75.4800991016,"7":133.2838911188,"8":231.2284895306,"9":391.6339815552,"10":639.3041712646},"ventilated":{"0":null,"1":1.1428571429,"2":3.4268287702,"3":7.9858196493,"4":15.2484695858,"5":28.0158666046,"6":50.3200660677,"7":88.8559274125,"8":154.1523263537,"9":261.0893210368,"10":426.2027808431}}',
		sir:
			'{"day":{"0":-3,"1":-2,"2":-1,"3":0,"4":1,"5":2,"6":3,"7":4,"8":5,"9":6,"10":7},"date":{"0":1585699200000,"1":1585785600000,"2":1585872000000,"3":1585958400000,"4":1586044800000,"5":1586131200000,"6":1586217600000,"7":1586304000000,"8":1586390400000,"9":1586476800000,"10":1586563200000},"susceptible":{"0":99933.3333333333,"1":99857.1428571429,"2":99704.8780819866,"3":99400.9453567126,"4":98916.7686942831,"5":98065.6088930295,"6":96578.6622621524,"7":94009.6048391661,"8":89656.5115764173,"9":82527.3785975455,"10":71519.8146104627},"infected":{"0":66.6666666667,"1":133.3333333333,"2":266.5504894419,"3":532.4045733671,"4":940.5234396013,"5":1657.3227494833,"6":2907.508987577,"7":5061.2079837667,"8":8691.2715345488,"9":14578.7942941993,"10":23503.6733821108},"recovered":{"0":0.0,"1":9.5238095238,"2":28.5714285714,"3":66.6500699203,"4":142.7078661156,"5":277.0683574872,"6":513.8287502705,"7":929.1871770672,"8":1652.2168890339,"9":2893.8271082552,"10":4976.5120074265}}',
		test: null,
		predictionInputs: 8,
	};

	const { admittedPatients } = output;
	const admitted = JSON.parse(admittedPatients);
	console.log(admitted);

	const { day, icu, ventilated, hospitalized } = admitted;

	const labels = Object.keys(day);
	const hospitalizedArr = Object.values(hospitalized).map((elem) =>
		Math.round(elem)
	);
	const ventilatedArr = Object.values(ventilated).map((elem) =>
		Math.round(elem)
	);
	const icuArr = Object.values(icu).map((elem) => Math.round(elem));

	let chartOptions = {
		maintainAspectRatio: false,
		legend: {
			display: false,
		},
		tooltips: {
			backgroundColor: "#f5f5f5",
			titleFontColor: "#333",
			bodyFontColor: "#666",
			bodySpacing: 4,
			xPadding: 12,
			mode: "nearest",
			intersect: 0,
			position: "nearest",
		},
		responsive: true,
		scales: {
			yAxes: [
				{
					barPercentage: 1.6,
					gridLines: {
						drawBorder: false,
						color: "rgba(29,140,248,0.0)",
						zeroLineColor: "transparent",
					},
					ticks: {
						suggestedMin: 60,
						suggestedMax: 125,
						padding: 20,
						fontColor: "#9a9a9a",
					},
				},
			],
			xAxes: [
				{
					barPercentage: 1.6,
					gridLines: {
						drawBorder: false,
						color: "rgba(29,140,248,0.1)",
						zeroLineColor: "transparent",
					},
					ticks: {
						padding: 20,
						fontColor: "#9a9a9a",
					},
				},
			],
		},
	};

	let chartStates = {
		hospitalized: (canvas) => {
			let ctx = canvas.getContext("2d");

			let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

			gradientStroke.addColorStop(1, "rgba(29,140,248,0.2)");
			gradientStroke.addColorStop(0.4, "rgba(29,140,248,0.0)");
			gradientStroke.addColorStop(0, "rgba(29,140,248,0)"); //blue colors

			return {
				labels: labels,
				datasets: [
					{
						label: "Νοσηλευόμενοι",
						fill: true,
						backgroundColor: gradientStroke,
						borderColor: "#1f8ef1",
						borderWidth: 2,
						borderDash: [],
						borderDashOffset: 0.0,
						pointBackgroundColor: "#1f8ef1",
						pointBorderColor: "rgba(255,255,255,0)",
						pointHoverBackgroundColor: "#1f8ef1",
						pointBorderWidth: 20,
						pointHoverRadius: 4,
						pointHoverBorderWidth: 15,
						pointRadius: 4,
						data: hospitalizedArr,
					},
				],
			};
		},
		ventilated: (canvas) => {
			let ctx = canvas.getContext("2d");

			let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

			gradientStroke.addColorStop(1, "rgba(29,140,248,0.2)");
			gradientStroke.addColorStop(0.4, "rgba(29,140,248,0.0)");
			gradientStroke.addColorStop(0, "rgba(29,140,248,0)"); //blue colors

			return {
				labels: labels,
				datasets: [
					{
						label: "Σε αναπνευστήρα",
						fill: true,
						backgroundColor: gradientStroke,
						borderColor: "#1f8ef1",
						borderWidth: 2,
						borderDash: [],
						borderDashOffset: 0.0,
						pointBackgroundColor: "#1f8ef1",
						pointBorderColor: "rgba(255,255,255,0)",
						pointHoverBackgroundColor: "#1f8ef1",
						pointBorderWidth: 20,
						pointHoverRadius: 4,
						pointHoverBorderWidth: 15,
						pointRadius: 4,
						data: ventilatedArr,
					},
				],
			};
		},
		inICU: (canvas) => {
			let ctx = canvas.getContext("2d");

			let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

			gradientStroke.addColorStop(1, "rgba(29,140,248,0.2)");
			gradientStroke.addColorStop(0.4, "rgba(29,140,248,0.0)");
			gradientStroke.addColorStop(0, "rgba(29,140,248,0)"); //blue colors

			return {
				labels: labels,
				datasets: [
					{
						label: "Σε ΜΕΘ",
						fill: true,
						backgroundColor: gradientStroke,
						borderColor: "#1f8ef1",
						borderWidth: 2,
						borderDash: [],
						borderDashOffset: 0.0,
						pointBackgroundColor: "#1f8ef1",
						pointBorderColor: "rgba(255,255,255,0)",
						pointHoverBackgroundColor: "#1f8ef1",
						pointBorderWidth: 20,
						pointHoverRadius: 4,
						pointHoverBorderWidth: 15,
						pointRadius: 4,
						data: icuArr,
					},
				],
			};
		},
		options: chartOptions,
	};

	const { id: inputId, hospitalId } = useParams();
	// const [hospital, setHospital] = useState({});
	const [data, setData] = useState({});
	const [chartData, setChartData] = useState(null);

	// useEffect(() => {
	// 	fetch("http://hfam.team/api/hospitals/" + hospitalId)
	// 		.then((res) => res.json())
	// 		.then((json) => {
	//             setHospital((prev) => json);
	//             console.log(json);
	//         })

	// 		.catch((err) => console.log(err));
	// }, [hospitalId]);

	useEffect(() => {
		fetch("http://hfam.team/api/predictionoutputs/input/" + inputId)
			.then((res) => res.json())
			.then((json) => setData((prev) => json))
			.catch((err) => console.log(err));
	}, [inputId]);

	return (
		<div className="content">
			<Row>
				<Col xs="12">
					<Card className="card-chart">
						<CardHeader>
							<Row>
								<Col className="text-left" sm="6">
									<h5 className="card-category">
										Total Shipments
									</h5>
									<CardTitle tag="h2">Performance</CardTitle>
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
														chartData ===
														chartStates.hospitalized,
												}
											)}
											onClick={() =>
												setChartData(
													(prev) =>
														chartStates.hospitalized
												)
											}
										>
											<input
												defaultChecked
												name="options"
												type="radio"
											/>
											<span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
												Accounts
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
														chartData ===
														chartStates.ventilated,
												}
											)}
											onClick={() =>
												setChartData(
													(prev) =>
														chartStates.ventilated
												)
											}
										>
											<input
												name="options"
												type="radio"
											/>
											<span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
												Purchases
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
														chartData ===
														chartStates.inICU,
												}
											)}
											onClick={() =>
												setChartData(
													(prev) => chartStates.inICU
												)
											}
										>
											<input
												name="options"
												type="radio"
											/>
											<span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
												Sessions
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
								<Line
									data={chartStates[chartData]}
									options={chartStates.options}
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
