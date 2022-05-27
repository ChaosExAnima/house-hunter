import { AddLocation } from '@mui/icons-material';
import {
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
} from '@mui/material';

export default function Menu() {
	return (
		<List>
			<ListItem>
				<ListItemButton href="/place/new">
					<ListItemIcon>
						<AddLocation />
					</ListItemIcon>
					<ListItemText primary="Add a Listing" />
				</ListItemButton>
			</ListItem>
		</List>
	);
}
