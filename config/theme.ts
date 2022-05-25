import { createTheme } from '@mui/material/styles';

import type { PaletteOptions } from '@mui/material';

// Create a theme instance.
const theme = (palette: PaletteOptions = {}) =>
	createTheme({
		typography: {
			fontSize: 16,
		},
		palette,
		components: {
			MuiButton: {
				defaultProps: {
					variant: 'contained',
				},
			},
			MuiTextField: {
				defaultProps: {
					margin: 'normal',
					fullWidth: true,
				},
			},
		},
	});

export const spacing = theme().spacing(4);

export default theme;
