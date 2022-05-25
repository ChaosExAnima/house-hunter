import { DarkMode, LightMode } from '@mui/icons-material';
import { Box, colors, Fab } from '@mui/material';

import { usePalettePicker } from 'components/palette';
import { PaletteName } from 'config/palettes';
import { spacing } from 'config/theme';

import styles from './styles.module.css';

export default function CommandButtons() {
	const {
		toggleColorMode,
		nextPalette,
		getPalette,
		palette: { mode },
	} = usePalettePicker();
	const modeColor =
		mode === 'light' ? colors.yellow[100] : colors.blueGrey[800];
	const palette = getPalette();
	const themeEmoji: Record<PaletteName, string> = {
		chill: '❄️',
		fairy: '🧚🏻‍♀️',
		goth: '🦇',
		pineapple: '🍍',
		rainbow: '🌈',
	};
	return (
		<Box
			sx={{
				m: spacing,
				gap: spacing,
			}}
			className={styles.wrapper}
		>
			<Fab
				onClick={() => nextPalette()}
				color="primary"
				className={styles.themeButton}
			>
				{themeEmoji[palette]}
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
