import { createContext, PropsWithChildren, useContext } from 'react';

const LoadingContext = createContext(false);

export function Loading({
	value,
	children,
}: PropsWithChildren<LoadingContextProps>) {
	return (
		<LoadingContext.Provider value={value ?? false}>
			{children}
		</LoadingContext.Provider>
	);
}

export default function useLoading() {
	return useContext(LoadingContext);
}
