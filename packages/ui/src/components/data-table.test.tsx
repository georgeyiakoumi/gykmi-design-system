import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { axe } from "vitest-axe";
import { DataTable } from "./data-table";

afterEach(() => {
	cleanup();
});

const columns = [
	{
		key: "name",
		header: "Name",
		cell: (row: { name: string; value: string }) => row.name,
		sortable: true,
	},
	{ key: "value", header: "Value", cell: (row: { name: string; value: string }) => row.value },
];

const data = [
	{ name: "Alpha", value: "100" },
	{ name: "Beta", value: "200" },
];

describe("DataTable", () => {
	it("renders with columns and data", () => {
		render(
			<DataTable
				columns={columns}
				data={data}
				getRowKey={(row) => row.name}
				caption="Test table"
			/>,
		);
		expect(screen.getByText("Name")).toBeInTheDocument();
		expect(screen.getByText("Value")).toBeInTheDocument();
	});

	it("renders all data rows", () => {
		render(
			<DataTable
				columns={columns}
				data={data}
				getRowKey={(row) => row.name}
				caption="Test table"
			/>,
		);
		expect(screen.getByText("Alpha")).toBeInTheDocument();
		expect(screen.getByText("Beta")).toBeInTheDocument();
		expect(screen.getByText("100")).toBeInTheDocument();
		expect(screen.getByText("200")).toBeInTheDocument();
	});
});

describe("DataTable a11y", () => {
	it("has no axe violations", async () => {
		const { container } = render(
			<DataTable
				columns={columns}
				data={data}
				getRowKey={(row) => row.name}
				caption="Test table"
			/>,
		);
		const results = await axe(container);
		expect(results.violations).toEqual([]);
	});
});
