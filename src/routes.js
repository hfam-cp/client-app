import { HospitalDashboard } from "./components/Hospitals/HospitalsDashboard/HospitalsDashboard";
// import { InputsForm } from "./components/InputsForm/InputsForm";

const routes = [
	{
		path: "/hospitals",
		name: "Hospitals",
		icon: "tim-icons icon-chart-pie-36",
		component: HospitalDashboard,
		layout: "/admin",
	},
];

export default routes;
