"use client";

import type { ToastMessage } from "../lib/use-toast";
import {
	Toast,
	ToastClose,
	ToastDescription,
	ToastProvider,
	ToastTitle,
	ToastViewport,
} from "./toast";

interface ToasterProps {
	toasts: ToastMessage[];
	onDismiss: (id: string) => void;
}

export function Toaster({ toasts, onDismiss }: ToasterProps) {
	return (
		<ToastProvider>
			{toasts.map((t) => (
				<Toast key={t.id} variant={t.variant} onOpenChange={(open) => !open && onDismiss(t.id)}>
					<div className="flex flex-col gap-1">
						<ToastTitle>{t.title}</ToastTitle>
						{t.description && <ToastDescription>{t.description}</ToastDescription>}
					</div>
					<ToastClose />
				</Toast>
			))}
			<ToastViewport />
		</ToastProvider>
	);
}
