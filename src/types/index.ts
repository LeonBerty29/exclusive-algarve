export type Blog = {
    slug: string;
    image: string;
    title: string;
    author: string;
    readTime: number;
    date: string;
    blogDetails?: React.ReactNode
}


export type RecentListingType = {
    id: string;
    imageUrl: string;
    name?: string;
    position?: string;
}

export type Home = {
    imagePaths: string[];
    description: string;
    location: string;
    price: number;
    userId: string | undefined;
    favorite: boolean;
    favoriteId: string;
    homeId: string;
    exclusive: boolean;
    tag: {
        name: string,
        slug: string
    }
    // pathName: string;
    grossArea: number;
    plotSize: number;
    amenities: {
        bedrooms: number,
        garage: number,
        bathrooms: number
    },
    liveVideo: boolean
}