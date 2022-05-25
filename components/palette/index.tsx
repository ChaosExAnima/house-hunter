import { colors, PaletteMode } from '@mui/material';
import { createContext, useContext, useMemo, useState } from 'react';

import palettes from 'config/palettes';

import type { PaletteColors, PaletteCommands, PaletteContext } from './types';

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
	const [[primary, secondary], setColors] = useState<PaletteColors>([
		defaultPalette.primary,
		defaultPalette.secondary,
	]);
	const commands: PaletteCommands = useMemo(
		() => ({
			toggleColorMode() {
				setMode((prevMode) =>
					prevMode === 'light' ? 'dark' : 'light',
				);
			},
			setColor(newPrimary, newSecondary) {
				setColors([newPrimary, newSecondary]);
			},
			setPalette(palette) {
				setColors(palettes[palette]);
			},
		}),
		[],
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
