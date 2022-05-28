import {
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Tooltip,
} from '@mui/material';
import { useMemo } from 'react';

import { DetailsListProps } from './types';

export default function DetailsList({ items }: DetailsListProps) {
	const filteredItems = useMemo(
		() => items.filter(({ text, force }) => force || text),
		[items],
	);
	return (
		<List>
			{filteredItems.map((item) => (
				<ListItem key={`${item.text}-${item.tooltip}`}>
					<ListItemIcon>
						{item.tooltip && (
							<Tooltip title={item.tooltip}>{item.icon}</Tooltip>
						)}
						{!item.tooltip && item.icon}
					</ListItemIcon>
					<ListItemText
						primary={item.text ?? 'Unknown'}
						secondary={item.subtext}
					/>
				</ListItem>
			))}
		</List>
	);
}
