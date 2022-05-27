import { colors, PaletteMode } from '@mui/material';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';

import palettes, { PaletteName } from 'config/palettes';

import {
	getPaletteModeFromCookie,
	getPaletteNameFromCookie,
	setCookiePaletteMode,
	setCookiePaletteName,
} from './cookie';

import type { PaletteCommands, PaletteContext } from './types';

const defaultMode: PaletteMode = 'dark';
const defaultName: PaletteName = 'chill';

const paletteContext = createContext<PaletteContext>({
	palette: {
		mode: defaultMode,
		primary: palettes[defaultName].at(0)!,
		secondary: palettes[defaultName].at(1)!,
	},
});

export const PaletteProvider = paletteContext.Provider;

export function usePalette() {
	const [mode, setMode] = useState<PaletteMode>(defaultMode);
	const [paletteName, setPaletteName] = useState<PaletteName>(defaultName);
	useEffect(() => {
		if (typeof window !== 'undefined') {
			setMode(getPaletteModeFromCookie());
			setPaletteName(getPaletteNameFromCookie());
		}
	}, []);
	const [primary, secondary] = palettes[paletteName];
	const paletteNames = Object.keys(palettes) as PaletteName[];
	const commands: PaletteCommands = useMemo(
		() => ({
			toggleColorMode() {
				setMode((prevMode) => {
					const newMode = prevMode === 'light' ? 'dark' : 'light';
					setCookiePaletteMode(newMode);
					return newMode;
				});
			},
			nextPalette() {
				let currentIndex = paletteNames.indexOf(paletteName);
				currentIndex++;
				if (currentIndex === paletteNames.length) {
					currentIndex = 0;
				}
				console.log(`Now using palette: ${paletteNames[currentIndex]}`);

				setPaletteName(paletteNames[currentIndex]);
				setCookiePaletteName(paletteNames[currentIndex]);
			},
			getPalette() {
				return paletteName;
			},
		}),
		[paletteName, paletteNames],
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
