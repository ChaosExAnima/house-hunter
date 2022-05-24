export default function faviconSvg(fill = 'white') {
	return (
		`<svg xmlns="http://www.w3.org/2000/svg" height="48" width="48" fill="${fill}">` +
		'<path d="M9.35 40.75V24.65H2.35L24 5.2L33.6 13.65V7.95H38.65V18.35L45.65 ' +
		'24.65H38.65V40.75H28.5V28.4H19.5V40.75ZM19.55 19.8H28.45Q28.45 18.05 27.125 ' +
		'16.9Q25.8 15.75 24 15.75Q22.2 15.75 20.875 16.875Q19.55 18 19.55 19.8Z"/></svg>'
	);
}
