import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
	const [imagesResult, videosResult] = await Promise.all([
		locals.supabase.storage.from('gallery').list('images', { limit: 100, offset: 0, sortBy: { column: 'name', order: 'asc' } }),
		locals.supabase.storage.from('gallery').list('video', { limit: 100, offset: 0, sortBy: { column: 'name', order: 'asc' } })
	]);

	return {
		galleryImages: imagesResult.data ?? [],
		galleryVideos: videosResult.data ?? []
	};
};
