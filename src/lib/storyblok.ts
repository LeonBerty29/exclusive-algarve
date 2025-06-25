import { Blog } from '@/components/storyblok/blog';
import { apiPlugin, storyblokInit } from '@storyblok/react/rsc';

export const getStoryblokApi = storyblokInit({
accessToken: process.env.NEXT_PUBLIC_STORYBLOK_DELIVERY_API_ACCESS_TOKEN,
use: [apiPlugin],
components: {
	blog: Blog,
},
apiOptions: {
	region: 'eu',
},
});