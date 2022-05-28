import { BreadcrumbsProps as MuiBreadcrumbProps } from '@mui/material';

interface Breadcrumb {
	href: string;
	text: string;
}

interface BreadcrumbProps extends MuiBreadcrumbProps {
	items: Array<Breadcrumb | string>;
}
