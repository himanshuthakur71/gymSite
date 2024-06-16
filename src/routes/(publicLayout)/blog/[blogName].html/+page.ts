import { error } from '@sveltejs/kit';

export async function load({ params, url }) {
	try {
		const blog = await import(`../../../../blogs/${params?.blogName}.md`);

		return {
			content: blog?.default,
			meta: blog?.metadata
		};
	} catch {
		throw error(404, {
			message: 'Not Found'
		});
	}
}
