"use client";
import { GridTileImage } from '@/components/tile';
import Link from 'next/link';

export default function CarouselSliderVertical({
    pauseOnHover = false,
    direction = 'up'
}: {
    pauseOnHover?: boolean;
    direction?: 'up' | 'down';
}) {

    const products = [
        {
            handle: "wireless-headphones",
            title: "Premium Wireless Headphones",
            priceRange: {
                maxVariantPrice: {
                    amount: "299.99",
                    currencyCode: "USD"
                }
            },
            featuredImage: {
                url: "/images/lifestyle-img5.png"
            }
        },
        {
            handle: "smart-watch",
            title: "Smart Fitness Watch",
            priceRange: {
                maxVariantPrice: {
                    amount: "199.99",
                    currencyCode: "USD"
                }
            },
            featuredImage: {
                url: "/images/lifestyle-img5.png"
            }
        },
        {
            handle: "laptop-stand",
            title: "Ergonomic Laptop Stand",
            priceRange: {
                maxVariantPrice: {
                    amount: "89.99",
                    currencyCode: "USD"
                }
            },
            featuredImage: {
                url: "/images/lifestyle-img5.png"
            }
        },
        {
            handle: "wireless-charger",
            title: "Fast Wireless Charger",
            priceRange: {
                maxVariantPrice: {
                    amount: "49.99",
                    currencyCode: "USD"
                }
            },
            featuredImage: {
                url: "/images/lifestyle-img5.png"
            }
        },
        {
            handle: "bluetooth-speaker",
            title: "Portable Bluetooth Speaker",
            priceRange: {
                maxVariantPrice: {
                    amount: "79.99",
                    currencyCode: "USD"
                }
            },
            featuredImage: {
                url: "/images/lifestyle-img5.png"
            }
        },
        {
            handle: "phone-case",
            title: "Protective Phone Case",
            priceRange: {
                maxVariantPrice: {
                    amount: "24.99",
                    currencyCode: "USD"
                }
            },
            featuredImage: {
                url: "/images/lifestyle-img5.png"
            }
        },
        {
            handle: "usb-hub",
            title: "7-Port USB Hub",
            priceRange: {
                maxVariantPrice: {
                    amount: "39.99",
                    currencyCode: "USD"
                }
            },
            featuredImage: {
                url: "/images/lifestyle-img5.png"
            }
        },
        {
            handle: "desk-lamp",
            title: "LED Desk Lamp",
            priceRange: {
                maxVariantPrice: {
                    amount: "59.99",
                    currencyCode: "USD"
                }
            },
            featuredImage: {
                url: "/images/lifestyle-img5.png"
            }
        },
        {
            handle: "mouse-pad",
            title: "Gaming Mouse Pad",
            priceRange: {
                maxVariantPrice: {
                    amount: "19.99",
                    currencyCode: "USD"
                }
            },
            featuredImage: {
                url: "/images/lifestyle-img5.png"
            }
        },
        {
            handle: "webcam",
            title: "4K Webcam",
            priceRange: {
                maxVariantPrice: {
                    amount: "129.99",
                    currencyCode: "USD"
                }
            },
            featuredImage: {
                url: "/images/lifestyle-img5.png"
            }
        }
    ];

    if (!products?.length) return null;

    const carouselProducts = [...products, ...products];

    return (
        <div className="h-[600px] overflow-hidden pb-6">
            <style jsx>{`
        @keyframes slideUp {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(-50%);
          }
        }
        
        @keyframes slideDown {
          0% {
            transform: translateY(-50%);
          }
          100% {
            transform: translateY(0);
          }
        }
        
        .sliding-carousel {
          animation: ${direction === 'up' ? 'slideUp' : 'slideDown'} 60s linear infinite;
          will-change: transform;
        }
        
        ${pauseOnHover ? '.sliding-carousel:hover { animation-play-state: paused; }' : ''}
      `}</style>

            <ul className="flex flex-col sliding-carousel gap-4 h-max">
                {carouselProducts.map((product, i) => (
                    <li
                        key={`${product.handle}${i}`}
                        className="relative h-[424px] w-[270px] flex-none"
                    >
                        <Link href={`/product/${product.handle}`} className="relative h-full w-full">
                            <GridTileImage
                                alt={product.title}
                                src={product.featuredImage?.url}
                                fill
                                sizes="270px"
                                className="object-cover"
                            />
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}