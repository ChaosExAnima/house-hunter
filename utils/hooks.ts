import { useRouter } from 'next/router';

export function useLink(to: string) {
	const router = useRouter();
	return () => router.push(to);
}
