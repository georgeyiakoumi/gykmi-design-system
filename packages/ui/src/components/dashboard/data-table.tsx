/* biome-ignore-all lint/correctness/useHookAtTopLevel: generic forwardRef pattern requires inner function */
"use client";

import { type ComponentPropsWithRef, forwardRef, type ReactNode, useMemo, useState } from "react";
import { cn } from "../../lib/cn";

export interface DataTableColumn<T> {
	/** Unique key for the column */
	key: string;
	/** Column header label */
	header: string;
	/** Render function for cell content */
	cell: (row: T) => ReactNode;
	/** Whether this column is sortable */
	sortable?: boolean;
	/** Whether this column is visible by default */
	defaultVisible?: boolean;
	/** Column width class */
	width?: string;
	/** Alignment */
	align?: "left" | "center" | "right";
	/** Sort value extractor for columns that render JSX */
	sortValue?: (row: T) => string | number;
}

export type SortDirection = "asc" | "desc" | null;

export interface DataTableProps<T> extends Omit<ComponentPropsWithRef<"div">, "children"> {
	/** Column definitions */
	columns: DataTableColumn<T>[];
	/** Row data */
	data: T[];
	/** Unique key extractor for each row */
	getRowKey: (row: T) => string;
	/** Whether the table is loading */
	loading?: boolean;
	/** Number of skeleton rows to show when loading */
	skeletonRows?: number;
	/** Custom empty state content */
	emptyMessage?: ReactNode;
	/** Whether to show sticky headers */
	stickyHeader?: boolean;
	/** Page size for pagination (0 = no pagination) */
	pageSize?: number;
	/** Sort function */
	onSort?: (key: string, direction: SortDirection) => void;
	/** External sort state */
	sortKey?: string;
	/** External sort direction */
	sortDirection?: SortDirection;
	/** Caption for a11y */
	caption?: string;
}

function DataTableInner<T>(
	{
		columns,
		data,
		getRowKey,
		loading,
		skeletonRows = 5,
		emptyMessage = "No data to display.",
		stickyHeader = true,
		pageSize = 0,
		onSort,
		sortKey,
		sortDirection,
		caption,
		className,
		...props
	}: DataTableProps<T>,
	ref: React.ForwardedRef<HTMLDivElement>,
) {
	const [internalSortKey, setInternalSortKey] = useState<string | null>(null);
	const [internalSortDir, setInternalSortDir] = useState<SortDirection>(null);
	const [currentPage, setCurrentPage] = useState(0);
	const [hiddenColumns, setHiddenColumns] = useState<Set<string>>(
		() => new Set(columns.filter((col) => col.defaultVisible === false).map((col) => col.key)),
	);

	const activeSortKey = sortKey ?? internalSortKey;
	const activeSortDir = sortDirection ?? internalSortDir;

	const visibleColumns = columns.filter((col) => !hiddenColumns.has(col.key));

	const sortedData = useMemo(() => {
		if (!activeSortKey || !activeSortDir) return data;
		return [...data].sort((a, b) => {
			const col = columns.find((c) => c.key === activeSortKey);
			if (!col) return 0;
			const aVal = col.sortValue ? String(col.sortValue(a)) : String(col.cell(a) ?? "");
			const bVal = col.sortValue ? String(col.sortValue(b)) : String(col.cell(b) ?? "");
			const cmp = aVal.localeCompare(bVal, undefined, { numeric: true });
			return activeSortDir === "desc" ? -cmp : cmp;
		});
	}, [data, activeSortKey, activeSortDir, columns]);

	const totalPages = pageSize > 0 ? Math.ceil(sortedData.length / pageSize) : 1;
	const paginatedData =
		pageSize > 0
			? sortedData.slice(currentPage * pageSize, (currentPage + 1) * pageSize)
			: sortedData;

	function handleSort(key: string) {
		let newDir: SortDirection;
		if (activeSortKey === key) {
			newDir = activeSortDir === "asc" ? "desc" : activeSortDir === "desc" ? null : "asc";
		} else {
			newDir = "asc";
		}
		if (onSort) {
			onSort(key, newDir);
		} else {
			setInternalSortKey(newDir ? key : null);
			setInternalSortDir(newDir);
		}
	}

	function toggleColumn(key: string) {
		setHiddenColumns((prev) => {
			const next = new Set(prev);
			if (next.has(key)) {
				next.delete(key);
			} else {
				next.add(key);
			}
			return next;
		});
	}

	const alignClass = (align?: "left" | "center" | "right") => {
		if (align === "center") return "text-center";
		if (align === "right") return "text-right";
		return "text-left";
	};

	return (
		<div ref={ref} className={cn("w-full", className)} {...props}>
			{/* Column visibility controls */}
			{columns.some((col) => col.defaultVisible === false) && (
				<div className="mb-2 flex flex-wrap gap-2">
					{columns.map((col) => (
						<label
							key={col.key}
							className="inline-flex items-center gap-1.5 text-xs text-text-muted cursor-pointer"
						>
							<input
								type="checkbox"
								checked={!hiddenColumns.has(col.key)}
								onChange={() => toggleColumn(col.key)}
								className="h-3 w-3 rounded border-border"
							/>
							{col.header}
						</label>
					))}
				</div>
			)}

			{/* Table */}
			<div className="overflow-auto ">
				<table className="w-full border-collapse text-sm">
					{caption && <caption className="sr-only">{caption}</caption>}
					<thead>
						<tr className={cn(stickyHeader && "sticky top-0 z-10")}>
							{visibleColumns.map((col) => (
								<th
									key={col.key}
									scope="col"
									className={cn(
										"px-4 py-3 text-xs font-semibold uppercase tracking-wider text-text-muted",
										alignClass(col.align),
										col.width,
										col.sortable && "cursor-pointer select-none hover:text-text",
									)}
									onClick={col.sortable ? () => handleSort(col.key) : undefined}
									aria-sort={
										activeSortKey === col.key
											? activeSortDir === "asc"
												? "ascending"
												: activeSortDir === "desc"
													? "descending"
													: undefined
											: undefined
									}
								>
									<span className="inline-flex items-center gap-1">
										{col.header}
										{col.sortable && activeSortKey === col.key && activeSortDir && (
											<svg
												width="12"
												height="12"
												viewBox="0 0 12 12"
												fill="none"
												aria-hidden="true"
												className={activeSortDir === "desc" ? "rotate-180" : ""}
											>
												<title>sort</title>
												<path d="M6 3L9 7H3L6 3Z" fill="currentColor" />
											</svg>
										)}
									</span>
								</th>
							))}
						</tr>
					</thead>
					<tbody>
						{loading &&
							Array.from({ length: skeletonRows }).map((_, i) => (
								<tr key={`skeleton-${i.toString()}`} className="border-b border-border">
									{visibleColumns.map((col) => (
										<td key={col.key} className={cn("px-4 py-3", alignClass(col.align))}>
											<div className="h-4 animate-pulse rounded bg-surface-raised" />
										</td>
									))}
								</tr>
							))}
						{!loading && paginatedData.length === 0 && (
							<tr>
								<td
									colSpan={visibleColumns.length}
									className="px-4 py-12 text-center text-sm text-text-muted"
								>
									{emptyMessage}
								</td>
							</tr>
						)}
						{!loading &&
							paginatedData.map((row) => (
								<tr
									key={getRowKey(row)}
									className="border-b border-border transition-colors hover:bg-surface-raised"
								>
									{visibleColumns.map((col) => (
										<td
											key={col.key}
											className={cn("px-4 py-3 text-text", alignClass(col.align), col.width)}
										>
											{col.cell(row)}
										</td>
									))}
								</tr>
							))}
					</tbody>
				</table>
			</div>

			{/* Pagination */}
			{pageSize > 0 && totalPages > 1 && (
				<div className="mt-3 flex items-center justify-between text-xs text-text-muted">
					<span>
						Showing {currentPage * pageSize + 1}–
						{Math.min((currentPage + 1) * pageSize, sortedData.length)} of {sortedData.length}
					</span>
					<div className="flex gap-1">
						<button
							type="button"
							disabled={currentPage === 0}
							onClick={() => setCurrentPage((p) => p - 1)}
							className="rounded-md border border-border px-2.5 py-1 transition-colors hover:bg-surface-raised disabled:opacity-50 disabled:pointer-events-none"
						>
							Previous
						</button>
						<button
							type="button"
							disabled={currentPage >= totalPages - 1}
							onClick={() => setCurrentPage((p) => p + 1)}
							className="rounded-md border border-border px-2.5 py-1 transition-colors hover:bg-surface-raised disabled:opacity-50 disabled:pointer-events-none"
						>
							Next
						</button>
					</div>
				</div>
			)}
		</div>
	);
}

export const DataTable = forwardRef(DataTableInner) as <T>(
	props: DataTableProps<T> & { ref?: React.Ref<HTMLDivElement> },
) => React.ReactElement;
