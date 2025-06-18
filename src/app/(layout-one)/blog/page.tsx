import React from 'react'
import { Blog as BlogType } from "@/types";
import { PaginatedBlogNewsGrid } from '@/components/blog/paginated-blog-news-grid';

const Blog = () => {

    const blogs: BlogType[] = [
        {
            slug: "ciwkjwncwnkncw909",
            image: "/images/blog-img.png",
            title: "How to get the best luxury property in Algarve",
            author: "Marcela Boturao",
            readTime: 6,
            date: "03.24.2025",
        },
        {
            slug: "ciwkjwncwnkncw1010",
            image: "/images/blog-img.png",
            title: "The best restaurants in Algarve for a perfect dinner",
            author: "Rodrigo Boturao",
            readTime: 6,
            date: "03.24.2025",
        },
        {
            slug: "ciwkjwncwnkncw1011",
            image: "/images/blog-img.png",
            title: "The best beaches in Algarve for a relaxing day",
            author: "Leticia Boturao",
            readTime: 6,
            date: "03.24.2025",
        },
        {
            slug: "ciwkjwncwnkncw1012",
            image: "/images/blog-img.png",
            title: "The best golf courses in Algarve for a perfect round",
            author: "Marcelo Boturao",
            readTime: 6,
            date: "03.24.2025",
        },
        {
            slug: "ciwkjwncwnkncw909",
            image: "/images/blog-img.png",
            title: "How to get the best luxury property in Algarve",
            author: "Marcela Boturao",
            readTime: 6,
            date: "03.24.2025",
        },
        {
            slug: "ciwkjwncwnkncw1010",
            image: "/images/blog-img.png",
            title: "The best restaurants in Algarve for a perfect dinner",
            author: "Rodrigo Boturao",
            readTime: 6,
            date: "03.24.2025",
        },
        {
            slug: "ciwkjwncwnkncw1011",
            image: "/images/blog-img.png",
            title: "The best beaches in Algarve for a relaxing day",
            author: "Leticia Boturao",
            readTime: 6,
            date: "03.24.2025",
        },
        {
            slug: "ciwkjwncwnkncw1012",
            image: "/images/blog-img.png",
            title: "The best golf courses in Algarve for a perfect round",
            author: "Marcelo Boturao",
            readTime: 6,
            date: "03.24.2025",
        },
        {
            slug: "ciwkjwncwnkncw909",
            image: "/images/blog-img.png",
            title: "How to get the best luxury property in Algarve",
            author: "Marcela Boturao",
            readTime: 6,
            date: "03.24.2025",
        },
        {
            slug: "ciwkjwncwnkncw1010",
            image: "/images/blog-img.png",
            title: "The best restaurants in Algarve for a perfect dinner",
            author: "Rodrigo Boturao",
            readTime: 6,
            date: "03.24.2025",
        },
        {
            slug: "ciwkjwncwnkncw1011",
            image: "/images/blog-img.png",
            title: "The best beaches in Algarve for a relaxing day",
            author: "Leticia Boturao",
            readTime: 6,
            date: "03.24.2025",
        },
        {
            slug: "ciwkjwncwnkncw1012",
            image: "/images/blog-img.png",
            title: "The best golf courses in Algarve for a perfect round",
            author: "Marcelo Boturao",
            readTime: 6,
            date: "03.24.2025",
        },
        {
            slug: "ciwkjwncwnkncw909",
            image: "/images/blog-img.png",
            title: "How to get the best luxury property in Algarve",
            author: "Marcela Boturao",
            readTime: 6,
            date: "03.24.2025",
        },
        {
            slug: "ciwkjwncwnkncw1010",
            image: "/images/blog-img.png",
            title: "The best restaurants in Algarve for a perfect dinner",
            author: "Rodrigo Boturao",
            readTime: 6,
            date: "03.24.2025",
        },
        {
            slug: "ciwkjwncwnkncw1011",
            image: "/images/blog-img.png",
            title: "The best beaches in Algarve for a relaxing day",
            author: "Leticia Boturao",
            readTime: 6,
            date: "03.24.2025",
        },
        {
            slug: "ciwkjwncwnkncw1012",
            image: "/images/blog-img.png",
            title: "The best golf courses in Algarve for a perfect round",
            author: "Marcelo Boturao",
            readTime: 6,
            date: "03.24.2025",
        },
        {
            slug: "ciwkjwncwnkncw909",
            image: "/images/blog-img.png",
            title: "How to get the best luxury property in Algarve",
            author: "Marcela Boturao",
            readTime: 6,
            date: "03.24.2025",
        },
        {
            slug: "ciwkjwncwnkncw1010",
            image: "/images/blog-img.png",
            title: "The best restaurants in Algarve for a perfect dinner",
            author: "Rodrigo Boturao",
            readTime: 6,
            date: "03.24.2025",
        },
        {
            slug: "ciwkjwncwnkncw1011",
            image: "/images/blog-img.png",
            title: "The best beaches in Algarve for a relaxing day",
            author: "Leticia Boturao",
            readTime: 6,
            date: "03.24.2025",
        },
        {
            slug: "ciwkjwncwnkncw1012",
            image: "/images/blog-img.png",
            title: "The best golf courses in Algarve for a perfect round",
            author: "Marcelo Boturao",
            readTime: 6,
            date: "03.24.2025",
        },
        {
            slug: "ciwkjwncwnkncw909",
            image: "/images/blog-img.png",
            title: "How to get the best luxury property in Algarve",
            author: "Marcela Boturao",
            readTime: 6,
            date: "03.24.2025",
        },
        {
            slug: "ciwkjwncwnkncw1010",
            image: "/images/blog-img.png",
            title: "The best restaurants in Algarve for a perfect dinner",
            author: "Rodrigo Boturao",
            readTime: 6,
            date: "03.24.2025",
        },
        {
            slug: "ciwkjwncwnkncw1011",
            image: "/images/blog-img.png",
            title: "The best beaches in Algarve for a relaxing day",
            author: "Leticia Boturao",
            readTime: 6,
            date: "03.24.2025",
        },
        {
            slug: "ciwkjwncwnkncw1012",
            image: "/images/blog-img.png",
            title: "The best golf courses in Algarve for a perfect round",
            author: "Marcelo Boturao",
            readTime: 6,
            date: "03.24.2025",
        },
    ]

    return (
        <div className='pt-10'>
            <div className='lg:container mx-auto px-6 sm:px-8 md:px-10 lg:px-12'>
                <div className='flex items-center gap-2 justify-between py-5 md:py-8 flex-wrap'>
                    <div className='w-full md:w-[47%]'>
                        <h1 className='text-2xl lg:text-3xl font-normal'>YOU&apos;LL NEVER MISS AN <br /><span className='text-primary'>OPPORTUNITY !</span></h1>
                    </div>

                    <div className='w-full md:w-[47%] lg:min-w-[unset]'>
                        <p className='text-neutral-700 text-sm '>
                            Directors Marcela Boturao & Bart van Linden would like to welcome you to meet the team of Exclusive Algarve Villas. Both Marcela and Bart have been active in selling luxury real estate in the Algarve for over a decade. They have built up a multi award winning company and continue to grow the business year after year.
                        </p>
                    </div>

                </div>
            </div>

            <div className="py-14 lg:container mx-auto px-6 sm:px-8 md:px-10 lg:px-12">
                <PaginatedBlogNewsGrid blogs={blogs} />
            </div>

        </div>
    )
}

export default Blog