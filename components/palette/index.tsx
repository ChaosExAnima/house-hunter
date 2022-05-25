import { colors, PaletteMode } from '@mui/material';
import { createContext, useContext, useMemo, useState } from 'react';

import palettes, { PaletteName } from 'config/palettes';

import type { PaletteCommands, PaletteContext } from './types';

const defaultPalette = {
	mode: 'dark',
	primary: colors.deepOrange,
	secondary: colors.amber,
} as const;
const paletteContext = createContext<PaletteContext>({
	palette: defaultPalette,
});

export const PaletteProvider = paletteContext.Provider;

export function usePalette() {
	const [mode, setMode] = useState<PaletteMode>(defaultPalette.mode);
	const [palette, setPalette] = useState<PaletteName>('chill');
	const [primary, secondary] = palettes[palette];
	const paletteNames = Object.keys(palettes) as PaletteName[];
	const commands: PaletteCommands = useMemo(
		() => ({
			toggleColorMode() {
				setMode((prevMode) =>
					prevMode === 'light' ? 'dark' : 'light',
				);
			},
			nextPalette() {
				let currentIndex = paletteNames.indexOf(palette);
				currentIndex++;
				if (currentIndex === paletteNames.length) {
					currentIndex = 0;
				}
				console.log(`Now using palette: ${paletteNames[currentIndex]}`);

				setPalette(paletteNames[currentIndex]);
			},
			getPalette() {
				return palette;
			},
		}),
		[palette, paletteNames],
	);
	return {
		palette: {
			mode,
			primary,
			secondary,
		},
		...commands,
	};
}

export function usePalettePicker() {
	const { palette, ...commands } = useContext<PaletteContext>(
		paletteContext,
	) as Required<PaletteContext>;
	return {
		palette,
		...commands,
		textColor:
			palette.mode === 'dark' ? colors.common.white : colors.common.black,
	};
}
