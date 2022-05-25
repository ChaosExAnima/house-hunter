import { PaletteColorOptions, PaletteOptions } from '@mui/material';

import { PaletteName } from 'config/palettes';

export interface PaletteCommands {
	toggleColorMode();
	setColor(
		newPrimary: PaletteColorOptions,
		newSecondary: PaletteColorOptions,
	);
	setPalette(palette: PaletteName);
}

export interface PaletteContext extends Partial<PaletteCommands> {
	palette: PaletteOptions;
}

export type PaletteColors = [
	primary: PaletteColorOptions,
	secondary: PaletteColorOptions,
];
