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
		comments: {},
		ratings: { 'echognyc@gmail.com': 0.5 },
	},
	{
		id: 'test2',
		address: '967 Greene Ave ',
		slug: slugify('967 Greene Ave '),
		active: true,
		links: [
			'https://www.zillow.com/homedetails/1460-Carroll-St-2R-Brooklyn-NY-11213/2064161700_zpid/',
			'https://streeteasy.com/building/1460-carroll-street-brooklyn/2r',
		],
		neighborhood: 'Stuy Heights',
		price: 8_000,
		images: [],
		comments: {},
		ratings: {},
	},
	{
		id: 'test3',
		address: '2715 Farragut Rd',
		slug: slugify('2715 Farragut Rd'),
		active: true,
		links: [
			'https://www.zillow.com/homedetails/1460-Carroll-St-2R-Brooklyn-NY-11213/2064161700_zpid/',
			'https://streeteasy.com/building/1460-carroll-street-brooklyn/2r',
		],
		neighborhood: 'Flatbush',
		price: 4_500,
		images: [
			'https://photos.zillowstatic.com/fp/6f0990af642be5bb972a98f0bdcd58ef-se_large_800_400.webp',
		],
		comments: {},
		ratings: {},
	},
];

export default listings;
