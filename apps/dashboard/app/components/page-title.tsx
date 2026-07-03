"use client";

import type { BadgeVariant } from "@gykmi/ui";
import { Badge, Text } from "@gykmi/ui";

interface StatusBadge {
	label: string;
	count: number;
	variant: BadgeVariant;
	href?: string;
}

interface PageTitleProps {
	title: string;
	badges?: StatusBadge[];
}

export function PageTitle({ title, badges }: PageTitleProps) {
	return (
		<div className="flex flex-col items-start gap-4">
			<Text as="h1" variant="heading-2xl">
				{title}
			</Text>
			{badges && badges.length > 0 && (
				<div className="flex items-center gap-2">
					{badges.map((badge) =>
						badge.count > 0 ? (
							badge.href ? (
								<a key={badge.label} href={badge.href} className="no-underline">
									<Badge
										variant={badge.variant}
										label={badge.label}
										count={badge.count}
										className="cursor-pointer hover:opacity-80"
										style={{ transition: `opacity var(--duration-normal) var(--easing-default)` }}
									/>
								</a>
							) : (
								<Badge
									key={badge.label}
									variant={badge.variant}
									label={badge.label}
									count={badge.count}
								/>
							)
						) : null,
					)}
				</div>
			)}
		</div>
	);
}
