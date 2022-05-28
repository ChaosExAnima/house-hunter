import { Typography } from '@mui/material';
import { useMemo } from 'react';

import { currency } from 'utils/text';

import type { PriceProps } from './types';

export default function Price({
	amount,
	noDollar = false,
	...props
}: PriceProps) {
	const color = useMemo(() => {
		const budget = Number.parseInt(
			process.env.NEXT_PUBLIC_BUDGET ?? '5000',
		);
		if (amount > budget) {
			return 'error.main';
		} else if (amount < budget - 1000) {
			return 'success.main';
		}
		return 'text.primary';
	}, [amount]);
	const text = useMemo(() => {
		const price = currency(amount);
		if (noDollar) {
			return price.replace('$', '');
		}
		return price;
	}, [amount, noDollar]);
	return (
		<Typography {...props} color={color}>
			{text}
		</Typography>
	);
}
