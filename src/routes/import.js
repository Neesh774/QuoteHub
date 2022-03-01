/** @type {import('@sveltejs/kit').RequestHandler} */
export async function get({ url }) {
	const dataBase64 = url.searchParams.get('data');
	if (!dataBase64) {
		return {
			status: 303,
			headers: {
				location: '/'
			}
		};
	}

	const data = Buffer.from(dataBase64, 'base64').toString();
	try {
		const parsedData = JSON.parse(data).map(
			(q) =>
				(q = {
					id: 'n',
					quote: q.text.trim(),
					author: q.author.trim(),
					created: q.editedTimestamp ?? q.createdTimestamp
				})
		);
		return {
			status: 200,
			body: { data: parsedData }
		};
	} catch (e) {
		return {
			status: 303,
			headers: {
				location: '/'
			}
		};
	}
}
