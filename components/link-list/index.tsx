import { Launch as LaunchIcon } from '@mui/icons-material';
import { Button, ButtonGroup } from '@mui/material';

import { LinkListProps } from './types';

export default function LinkList({ links }: LinkListProps) {
	return (
		<ButtonGroup>
			{links.map((link) => (
				<Button
					href={link}
					key={link}
					target="_blank"
					endIcon={<LaunchIcon />}
					color="secondary"
				>
					{linkToName(link)}
				</Button>
			))}
		</ButtonGroup>
	);
}

function linkToName(link: string) {
	try {
		const url = new URL(link);
		return url.host.replace(/\.[a-z]{3,4}$/i, '').replace('www.', '');
	} catch (err) {}
	return 'Link';
}
