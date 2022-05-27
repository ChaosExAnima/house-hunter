import { PaletteColorOptions, PaletteMode } from '@mui/material';

import { PaletteName } from 'config/palettes';

export interface PaletteCommands {
	toggleColorMode();
	nextPalette();
	getPalette(): PaletteName;
}

export interface PaletteContextColors {
	mode: PaletteMode;
	primary: PaletteColorOptions;
	secondary: PaletteColorOptions;
}

export interface PaletteContext extends Partial<PaletteCommands> {
	palette: PaletteContextColors;
}

export type PaletteColors = [
	primary: PaletteColorOptions,
	secondary: PaletteColorOptions,
];
