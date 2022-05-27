import { AddLocation, RateReview } from '@mui/icons-material';
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
					<ListItemText primary="Add a listing" />
				</ListItemButton>
			</ListItem>
			<ListItem>
				<ListItemButton href="/place/review">
					<ListItemIcon>
						<RateReview />
					</ListItemIcon>
					<ListItemText primary="Review listings" />
				</ListItemButton>
			</ListItem>
		</List>
	);
}
