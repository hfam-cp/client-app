import React from "react";
import { Table } from "reactstrap";

export function OutputsTable({ day, icu, ventilated, hospitalized }) {
    return (
		<Table responsive>
			<thead className="text-primary">
				<tr>
					<th>Ημερα</th>
					<th>Χρηζουν ΜΕΘ</th>
					<th>Χρηζουν Αναπνευστηρα</th>
					<th>Χρηζουν Κλινης</th>
				</tr>
			</thead>
			<tbody>
				{!!day && Object.keys(day).map((dayNum, index) => (
					<tr key={index}>
						<td>{dayNum}</td>
						<td>{Math.round(icu[index])}</td>
						<td>{Math.round(ventilated[index])}</td>
						<td>{Math.round(hospitalized[index])}</td>
					</tr>
				))}
			</tbody>
		</Table>
	);
}
