import { BlogNewsGrid } from '@/components/blog/blog-news-grid'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'
import { Blog } from '@/types'
import { Timer } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const BlogArticlePage = () => {
  const blog = {
    title: "Best places to visit in Algarve, Portugal",
    readTime: 10
  }
  return (
    <div>
      <div className="py-14 lg:container mx-auto px-6 sm:px-8 md:px-10 lg:px-12">
        <div className='flex flex-col gap-6 xl:flex-row'>
          <div className='flex-1'>
            <div className='relative w-full h-96'>
              <Image
                src={"/images/lifestyle-img5.png"}
                alt='a beautiful sea view'
                fill
                className='object-cover'
                priority
              />
            </div>

            <div className='flex items-start justify-between gap-4 mt-5 mb-12'>
              <h1 className='flex-1 text-2xl md:text-3xl'>{blog.title}</h1>
              <div className='flex items-center gap-1 flex-nowrap w-fit'>
                <Timer className='h-4 w-4 text-primary' />
                <p className='text-xs text-primary'>{blog.readTime} min read</p>
              </div>
            </div>

            {
              <BlogDetails />
            }

            <Separator className='mb-6' />

            <div className='space-y-5 mb-18'>
              <div className='flex gap-3 items-center'>
                <Image
                  src={"/images/team-member-1.png"}
                  alt='team member'
                  height={40}
                  width={40}
                  className='rounded-full object-cover h-10 w-10'
                />

                <p className='text-sm font-semibold'>Marcos Verrati</p>
              </div>

              <form className='space-y-3'>
                <Textarea
                  placeholder="Leave your comment here"
                  className="bg-gray-100 border-gray-200 focus:border-gray-300 focus:ring-gray-300"
                  rows={4}
                />
                <Button
                  type="submit"
                  className="bg-black hover:bg-primary text-white flex ml-auto"
                >
                  SUBMIT
                </Button>
              </form>
            </div>

            <h3 className='text-2xl xl:text-3xl font-normal mb-5'>Related Articles</h3>
            <RelatedArticles />
          </div>

          <div className='sm:min-w-[400px]'>
            <h2 className='text-2xl mb-6'>Recent Post</h2>
            <div className='flex flex-wrap  gap-4 xl:flex-col'>
              <div className='w-full sm:w-[23%] sm:min-w-[300px] lg:min-w-[400px] xl:w-full'>
                <RecentPostCard />
              </div>
              <div className='w-full sm:w-[23%] sm:min-w-[300px] lg:min-w-[400px] xl:w-full'>
                <RecentPostCard />
              </div>
              <div className='w-full sm:w-[23%] sm:min-w-[300px] lg:min-w-[400px] xl:w-full'>
                <RecentPostCard />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BlogArticlePage

function BlogDetails(
  // { blog }: { blog: Blog }
) {
  
  return (
    <>

      <div className='text-xs md:text-sm mb-10'>
        <p className='mb-14'>
          Since its establishment in 2006, Exclusive Algarve Villas has become synonymous with excellence in the luxury real estate sector. Operating from strategically located offices in Lagos, Lagoa, and Vilamoura, the brokerage offers a meticulously curated portfolio of high-end properties, including oceanfront villas, modern contemporary homes, golf resort residences, and investment projects.
          <br />
          With a team of multilingual property professionals fluent in Portuguese, English, Dutch, French, German, Spanish, and Italian, the company ensures fluent communication and personalized service for its global clientele. Buyers benefit from a tailored property search process, while sellers enjoy access to an elite network of qualified buyers, reducing unnecessary viewings and optimizing results.
        </p>

        <p className='text-lg font-semibold mb-4'>1. Vilamoura</p>
        <div className='flex gap-4 flex-wrap mb-5'>
          <Image
            src={"/images/lifestyle-img6.png"}
            alt='Arial view of Lisbon city'
            width={400}
            height={300}
            className='object-cover min-w-[300px] flex-1'
          />
          <Image
            src={"/images/lifestyle-img6.png"}
            alt='Arial view of Lisbon city'
            width={400}
            height={300}
            className='object-cover min-w-[300px] flex-1'
          />
        </div>
        <p>With a team of multilingual property professionals fluent in Portuguese, English, Dutch, French, German, Spanish, and Italian, the company ensures fluent communication and personalized service for its global clientele. Buyers benefit from a tailored property search process, while sellers enjoy access to an elite network of qualified buyers, reducing unnecessary viewings and optimizing results. </p>
      </div>
    </>
  )
}

function RelatedArticles() {
  const blogs: Blog[] = [
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
  ]
  return (
    <>
      <BlogNewsGrid blogs={blogs} perLine={3} />
    </>
  )
}


function RecentPostCard() {
  return (
    <Link href={`/blog/article`} className='p-4 bg-gray-100 block'>
      <div className='flex justify-between items-center text-xs mb-2'>
        <p>13 min read</p>
        <p className='text-neutral-500'>04.15.2025</p>
      </div>
      <h4 className='mb-3'>How to make sure you get what you need</h4>
      <p className='text-xs text-neutral-500'>Lucia</p>
    </Link>
  )
}