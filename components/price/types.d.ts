import { TypographyProps } from '@mui/material';

export interface PriceProps extends TypographyProps {
	amount: number;
	noDollar?: boolean;
}
