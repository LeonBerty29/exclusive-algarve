import Image from "next/image";
import { Blog } from "@/types";
import Link from "next/link";

export function BlogNewsCard({ blog }: { blog: Blog }) {

    return (
        <>
            <Link href={`/blog/${blog.slug}`} className="w-full">
                <div className="relative w-full h-48">
                    <Image
                        src={blog.image}
                        alt="Blog image"
                        fill
                        className="object-cover"
                    />
                </div>

                <div className="py-2">
                    <p className="text-neutral-900 flex items-center justify-between text-sm">
                        <span>
                            <span>{blog.readTime}</span> min read
                        </span>

                        <span className="text-muted-foreground/85">{blog.date}</span>
                    </p>
                </div>

                <div>
                    <h3 className="text-neutral-900 font-medium text-lg mb-2 leading-tight">
                        {blog.title}
                    </h3>

                    <p className="text-gray-400 text-sm">{blog.author}</p>
                </div>
            </Link>
        </>
    );
}