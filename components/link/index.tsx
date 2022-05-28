import { Link as MuiLink, LinkProps } from '@mui/material';
import NextLink from 'next/link';

export default function Link({ href, children, ...props }: LinkProps) {
	if (!href) {
		return null;
	}
	return (
		<NextLink href={href}>
			<MuiLink {...props} href={href}>
				{children}
			</MuiLink>
		</NextLink>
	);
}
