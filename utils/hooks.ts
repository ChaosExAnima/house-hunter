import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

export function useLink(to: string) {
	const router = useRouter();
	return () => router.push(to);
}

export function useSessionCheck() {
	const { status } = useSession({ required: true });
	return status === 'authenticated';
}
