import React from "react";
import { Line } from "react-chartjs-2";
import { chartOptions } from "./chartOptions";

export function LineChart({ datasetLabel, labels, data }) {
	function createChart(labels, data) {
		return function chart(canvas) {
			let ctx = canvas.getContext("2d");

			let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

			gradientStroke.addColorStop(1, "rgba(29,140,248,0.2)");
			gradientStroke.addColorStop(0.4, "rgba(29,140,248,0.0)");
			gradientStroke.addColorStop(0, "rgba(29,140,248,0)"); //blue colors

			return {
				labels: labels,
				datasets: [
					{
						label: datasetLabel,
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
						data: data,
					},
				],
			};
		};
	}

	return <Line data={createChart(labels, data)} options={chartOptions} />;
}
