import { colors } from '@mui/material';

import type { PaletteColors } from 'components/palette/types';

export type PaletteName = 'chill' | 'goth' | 'fairy' | 'rainbow' | 'pineapple';

const palettes: Record<PaletteName, PaletteColors> = {
	chill: [colors.deepOrange, colors.indigo],
	goth: [colors.deepPurple, colors.blueGrey],
	fairy: [colors.pink, colors.purple],
	rainbow: [colors.red, colors.indigo],
	pineapple: [colors.orange, colors.yellow],
};

export default palettes;
