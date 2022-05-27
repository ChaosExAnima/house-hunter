import HouseIcon from '@mui/icons-material/House';
import { Typography } from '@mui/material';
import classnames from 'classnames';

import { usePalettePicker } from 'components/palette';

import styles from './style.module.css';

export default function Logo() {
	const { getPalette } = usePalettePicker();
	return (
		<Typography variant="h1" textAlign="center">
			<HouseIcon
				sx={{ fontSize: 100 }}
				color="primary"
				className={classnames({
					[styles.icon]: true,
					[styles.rainbow]: getPalette() === 'rainbow',
				})}
			/>
		</Typography>
	);
}
