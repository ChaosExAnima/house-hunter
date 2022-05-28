import {
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Skeleton,
	Tooltip,
} from '@mui/material';
import { useMemo } from 'react';

import useLoading from 'components/loading-context';

import { DetailsListProps } from './types';

export default function DetailsList({ items }: DetailsListProps) {
	const loading = useLoading();
	const filteredItems = useMemo(
		() => items.filter(({ text, force }) => force || text),
		[items],
	);
	return (
		<List>
			{filteredItems.map((item) => (
				<ListItem key={`${item.text}-${item.tooltip}`}>
					<ListItemIcon>
						{loading && (
							<Skeleton
								variant="circular"
								width={27}
								height={27}
							/>
						)}
						{!loading && item.tooltip && (
							<Tooltip title={item.tooltip}>{item.icon}</Tooltip>
						)}
						{!loading && !item.tooltip && item.icon}
					</ListItemIcon>
					{!loading && (
						<ListItemText
							primary={item.text ?? 'Unknown'}
							secondary={item.subtext}
						/>
					)}
					{loading && (
						<ListItemText
							primary={<Skeleton />}
							secondary={item.subtext && <Skeleton />}
						/>
					)}
				</ListItem>
			))}
		</List>
	);
}
