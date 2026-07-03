"use client";

import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
	SidebarTrigger,
} from "@gykmi/ui";
import type { ReactNode } from "react";

interface BreadcrumbEntry {
	label: string;
	href?: string;
}

interface PageHeaderProps {
	breadcrumbs: BreadcrumbEntry[];
	action?: ReactNode;
}

export function PageHeader({ breadcrumbs, action }: PageHeaderProps) {
	return (
		<div className="sticky top-0 z-1 flex items-center justify-between bg-surface border-b border-border pl-6 pr-4 py-2">
			<div className="flex items-center gap-2">
				<SidebarTrigger className="md:hidden" />
				<Breadcrumb>
					<BreadcrumbList>
						{breadcrumbs.flatMap((crumb, i) => {
							const isLast = i === breadcrumbs.length - 1;
							const items = [];
							if (i > 0) items.push(<BreadcrumbSeparator key={`sep-${crumb.label}`} />);
							items.push(
								<BreadcrumbItem key={crumb.label}>
									{isLast ? (
										<BreadcrumbPage>{crumb.label}</BreadcrumbPage>
									) : (
										<BreadcrumbLink href={crumb.href ?? "#"}>{crumb.label}</BreadcrumbLink>
									)}
								</BreadcrumbItem>,
							);
							return items;
						})}
					</BreadcrumbList>
				</Breadcrumb>
			</div>
			{action}
		</div>
	);
}
