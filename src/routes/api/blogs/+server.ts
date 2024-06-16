import { json } from '@sveltejs/kit';

async function getBlogs() {
	let blogs: any[] = [];

	const paths = import.meta.glob('/src/blogs/*.md', { eager: true });

	for (const path in paths) {
		const file = paths[path];
		const slug = path.split('/').at(-1)?.replace('.md', '');

		if (file && typeof file === 'object' && 'metadata' in file && slug) {
			const metadata = file.metadata as Omit<any, 'slug'>;
			const blog: any = { ...metadata, slug };
			blog.published && blogs.push(blog);
		}
	}

	blogs = blogs.sort(
		(first, second) => new Date(second.date).getTime() - new Date(first.date).getTime()
	);

	return blogs;
}

export async function GET() {
	const blogs = await getBlogs();
	return json(blogs);
}
