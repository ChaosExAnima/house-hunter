import { BreadcrumbsProps as MuiBreadcrumbProps } from '@mui/material';

interface Breadcrumb {
	href: string;
	text: string;
}

type BreadcrumbItem = Breadcrumb | string | undefined;

interface BreadcrumbProps extends MuiBreadcrumbProps {
	items: BreadcrumbItem[];
}

interface BreadcrumbProp {
	item: BreadcrumbItem;
	loading: boolean;
}
