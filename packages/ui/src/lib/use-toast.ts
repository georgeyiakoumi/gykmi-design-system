"use client";

import { useCallback, useState } from "react";

export interface ToastMessage {
	id: string;
	title: string;
	description?: string;
}

export function useToast() {
	const [toasts, setToasts] = useState<ToastMessage[]>([]);

	const toast = useCallback((message: Omit<ToastMessage, "id">) => {
		const id = crypto.randomUUID();
		setToasts((prev) => [...prev, { ...message, id }]);
	}, []);

	const dismiss = useCallback((id: string) => {
		setToasts((prev) => prev.filter((t) => t.id !== id));
	}, []);

	return { toasts, toast, dismiss };
}
