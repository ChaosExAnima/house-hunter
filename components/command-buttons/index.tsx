import { DarkMode, LightMode } from '@mui/icons-material';
import { Box, colors, Fab } from '@mui/material';

import { usePalettePicker } from 'components/palette';
import { spacing } from 'config/theme';

export default function CommandButtons() {
	const {
		toggleColorMode,
		palette: { mode },
	} = usePalettePicker();
	const modeColor =
		mode === 'light' ? colors.yellow[100] : colors.blueGrey[800];
	return (
		<Box sx={{ m: spacing }}>
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
