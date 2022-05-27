import { slugify } from 'utils/text';

import type { Listing } from './types';

const listings: Listing[] = [
	{
		id: 'test1',
		address: '1460 Carroll St #2R',
		slug: slugify('1460 Carroll St #2R'),
		active: true,
		links: [
			'https://www.zillow.com/homedetails/1460-Carroll-St-2R-Brooklyn-NY-11213/2064161700_zpid/',
			'https://streeteasy.com/building/1460-carroll-street-brooklyn/2r',
		],
		neighborhood: 'Crown Heights',
		price: 4_725,
		images: [],
		comments: new Map(),
		ratings: new Map(),
	},
];

export default listings;
