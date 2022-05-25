import { PaletteColorOptions, PaletteOptions } from '@mui/material';

export interface PaletteCommands {
	toggleColorMode: () => void;
	setColor: (
		newPrimary: PaletteColorOptions,
		newSecondary: PaletteColorOptions,
	) => void;
}

export interface PaletteContext extends Partial<PaletteCommands> {
	palette: PaletteOptions;
}

export type PaletteColors = [
	primary: PaletteColorOptions,
	secondary: PaletteColorOptions,
];
