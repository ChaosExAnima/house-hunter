import { ReactElement } from 'react';

interface DetailsItem {
	icon: ReactElement;
	text?: ReactNode;
	subtext?: ReactNode;
	tooltip?: string;
	force?: boolean;
}

interface DetailsListProps {
	items: DetailsItem[];
}
