import cookies from 'js-cookie';

import palettes, { PaletteName } from 'config/palettes';

import type { PaletteMode } from '@mui/material';

const keyMode = 'palette-mode';
const keyPalette = 'palette-name';

export function getPaletteNameFromCookie(): PaletteName {
	const paletteName = cookies.get(keyPalette);
	return isValidPaletteName(paletteName) ? paletteName : 'chill';
}

export function getPaletteModeFromCookie(): PaletteMode {
	return cookies.get(keyMode) === 'light' ? 'light' : 'dark';
}

export function setCookiePaletteName(name: PaletteName) {
	cookies.set(keyPalette, name);
}

export function setCookiePaletteMode(mode: PaletteMode) {
	cookies.set(keyMode, mode);
}

function isValidPaletteName(name?: string): name is PaletteName {
	if (!name) {
		return false;
	}
	return Object.keys(palettes).includes(name);
}
