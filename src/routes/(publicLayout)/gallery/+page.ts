import { supabase } from '$lib/supabaseClient';
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
	async function getAllFilesInImagesFolder() {
		// Retrieve the list of files in the 'images' folder of the 'gallery' bucket
		const { data, error } = await supabase.storage.from('gallery').list('images', {
			limit: 100, // Adjust the limit as needed
			offset: 0,
			sortBy: { column: 'name', order: 'asc' } // Optional: Sort files by name
		});

		if (error) {
			console.error('Error retrieving files:', error);
			return [];
		}

		return data;
	}

	async function getAllFilesInVideoFolder() {
		// Retrieve the list of files in the 'images' folder of the 'gallery' bucket
		const { data, error } = await supabase.storage.from('gallery').list('video', {
			limit: 100, // Adjust the limit as needed
			offset: 0,
			sortBy: { column: 'name', order: 'asc' } // Optional: Sort files by name
		});

		if (error) {
			console.error('Error retrieving files:', error);
			return [];
		}

		return data;
	}

	return {
		galleryImages: await getAllFilesInImagesFolder(),
		galleryVideos: await getAllFilesInVideoFolder()
	};
};
