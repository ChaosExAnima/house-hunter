import HouseIcon from '@mui/icons-material/House';
import { Typography } from '@mui/material';

export default function Logo() {
	return (
		<Typography variant="h1" textAlign="center">
			<HouseIcon sx={{ fontSize: 100 }} />
		</Typography>
	);
}
