import type { DataTableColumn } from "@gykmi/ui";
import { Badge, DataTable } from "@gykmi/ui";
import type { Meta, StoryObj } from "@storybook/react-vite";

interface Transaction {
	id: string;
	date: string;
	counterparty: string;
	instrument: string;
	amount: number;
	status: "settled" | "pending" | "failed";
}

const transactions: Transaction[] = [
	{
		id: "TXN-001",
		date: "2026-07-01",
		counterparty: "Citadel Securities",
		instrument: "US Treasury 10Y",
		amount: 2500000,
		status: "settled",
	},
	{
		id: "TXN-002",
		date: "2026-07-01",
		counterparty: "Goldman Sachs",
		instrument: "EUR/USD FX Forward",
		amount: 1200000,
		status: "pending",
	},
	{
		id: "TXN-003",
		date: "2026-06-30",
		counterparty: "JP Morgan",
		instrument: "AAPL Equity",
		amount: 450000,
		status: "settled",
	},
	{
		id: "TXN-004",
		date: "2026-06-30",
		counterparty: "Morgan Stanley",
		instrument: "Credit Default Swap",
		amount: 3800000,
		status: "settled",
	},
	{
		id: "TXN-005",
		date: "2026-06-29",
		counterparty: "Barclays",
		instrument: "GBP/USD Spot",
		amount: 890000,
		status: "failed",
	},
	{
		id: "TXN-006",
		date: "2026-06-29",
		counterparty: "BNP Paribas",
		instrument: "Euro Bund Future",
		amount: 1750000,
		status: "settled",
	},
	{
		id: "TXN-007",
		date: "2026-06-28",
		counterparty: "Deutsche Bank",
		instrument: "Interest Rate Swap",
		amount: 5200000,
		status: "pending",
	},
	{
		id: "TXN-008",
		date: "2026-06-28",
		counterparty: "UBS",
		instrument: "MSFT Equity",
		amount: 320000,
		status: "settled",
	},
	{
		id: "TXN-009",
		date: "2026-06-27",
		counterparty: "HSBC",
		instrument: "USD/JPY FX Option",
		amount: 2100000,
		status: "settled",
	},
	{
		id: "TXN-010",
		date: "2026-06-27",
		counterparty: "Nomura",
		instrument: "Nikkei 225 Future",
		amount: 960000,
		status: "pending",
	},
	{
		id: "TXN-011",
		date: "2026-06-26",
		counterparty: "Citadel Securities",
		instrument: "US Treasury 2Y",
		amount: 4100000,
		status: "settled",
	},
	{
		id: "TXN-012",
		date: "2026-06-26",
		counterparty: "Goldman Sachs",
		instrument: "S&P 500 ETF",
		amount: 780000,
		status: "settled",
	},
];

const statusVariant: Record<Transaction["status"], "default" | "success" | "danger" | "warning"> = {
	settled: "success",
	pending: "warning",
	failed: "danger",
};

const columns: DataTableColumn<Transaction>[] = [
	{ key: "id", header: "ID", cell: (row) => row.id, sortable: true, width: "w-28" },
	{ key: "date", header: "Date", cell: (row) => row.date, sortable: true, width: "w-28" },
	{ key: "counterparty", header: "Counterparty", cell: (row) => row.counterparty, sortable: true },
	{ key: "instrument", header: "Instrument", cell: (row) => row.instrument, sortable: true },
	{
		key: "amount",
		header: "Amount",
		cell: (row) => `$${row.amount.toLocaleString()}`,
		sortable: true,
		align: "right",
	},
	{
		key: "status",
		header: "Status",
		cell: (row) => <Badge variant={statusVariant[row.status]}>{row.status}</Badge>,
		sortable: true,
		align: "center",
	},
];

const meta = {
	title: "POV/DataTable",
	tags: ["autodocs"],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => (
		<DataTable
			columns={columns}
			data={transactions}
			getRowKey={(row) => row.id}
			caption="Recent transactions"
		/>
	),
};

export const WithPagination: Story = {
	render: () => (
		<DataTable
			columns={columns}
			data={transactions}
			getRowKey={(row) => row.id}
			pageSize={5}
			caption="Paginated transactions"
		/>
	),
};

export const Loading: Story = {
	render: () => (
		<DataTable
			columns={columns}
			data={[]}
			getRowKey={(row) => row.id}
			loading
			skeletonRows={5}
			caption="Loading transactions"
		/>
	),
};

export const Empty: Story = {
	render: () => (
		<DataTable
			columns={columns}
			data={[]}
			getRowKey={(row) => row.id}
			emptyMessage="No transactions found for the selected period."
			caption="Empty transactions"
		/>
	),
};
