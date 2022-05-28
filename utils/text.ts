export function slugify(input: string): string {
	return input
		.trim()
		.replace(/[^\-a-z0-9]+/gi, '-')
		.toLowerCase();
}

const formatter = new Intl.NumberFormat('en-US', {
	currency: 'USD',
	style: 'currency',
	maximumFractionDigits: 0,
});

export function currency(input: number): string {
	return formatter.format(input);
}
