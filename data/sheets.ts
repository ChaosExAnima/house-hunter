import { GoogleSpreadsheet } from 'google-spreadsheet';

import { getSecret } from 'utils/get-secret';

const doc = new GoogleSpreadsheet(getSecret('GOOGLE_SHEET_ID'));

export async function getDoc() {
	const key = getSecret('GOOGLE_SERVICE_KEY');
	await doc.useServiceAccountAuth({
		client_email: getSecret('GOOGLE_SERVICE_EMAIL'),
		private_key: key.trim(),
	});

	await doc.loadInfo(); // loads document properties and worksheets
	console.log(doc.title);
}
