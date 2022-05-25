import { colors, PaletteMode } from '@mui/material';
import { createContext, useContext, useMemo, useState } from 'react';

import type { PaletteColors, PaletteCommands, PaletteContext } from './types';

const defaultPalette = {
	mode: 'dark',
	primary: colors.purple,
	secondary: colors.blue,
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
	return useContext<PaletteContext>(
		paletteContext,
	) as Required<PaletteContext>;
}
