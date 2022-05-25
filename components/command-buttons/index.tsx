import { DarkMode, LightMode, Looks } from '@mui/icons-material';
import { Box, colors, Fab } from '@mui/material';

import { usePalettePicker } from 'components/palette';
import { spacing } from 'config/theme';

import styles from './styles.module.css';

export default function CommandButtons() {
	const {
		toggleColorMode,
		palette: { mode },
	} = usePalettePicker();
	const modeColor =
		mode === 'light' ? colors.yellow[100] : colors.blueGrey[800];
	return (
		<Box
			sx={{
				m: spacing,
				gap: spacing,
			}}
			className={styles.wrapper}
		>
			<Fab onClick={() => null} color="primary">
				<Looks />
			</Fab>
			<Fab
				onClick={() => toggleColorMode()}
				sx={{ backgroundColor: modeColor }}
			>
				{mode === 'dark' && <DarkMode />}
				{mode === 'light' && <LightMode />}
			</Fab>
		</Box>
	);
}
