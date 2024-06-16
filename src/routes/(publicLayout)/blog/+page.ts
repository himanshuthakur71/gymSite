export async function load({ fetch }) {
	const response = await fetch('api/blogs');
	const blogs: any[] = await response.json();
	return { blogs };
}
