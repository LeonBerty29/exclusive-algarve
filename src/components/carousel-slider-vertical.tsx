"use client"

import { GridTileImage } from "@/components/tile";

export default function CarouselSliderVertical({
  pauseOnHover = false,
  direction = "up",
}: {
  pauseOnHover?: boolean;
  direction?: "up" | "down";
}) {
  const products = [
    {
      title: "Award badge exclusive algarve villas",
      url: "/images/awards/awards-badge.jpg",
    },
    {
      title:
        "Exclusive algarve team member taking a picture with their award trophy",
      url: "/images/awards/awards-1.jpg",
    },
    {
      title:
        "Exclusive algarve team member taking a picture with their award trophy",
      url: "/images/awards/awards-2.jpg",
    },

    {
      title: "Award badge exclusive algarve villas",
      url: "/images/awards/awards-badge.jpg",
    },
    {
      title:
        "Exclusive algarve team member taking a picture with their award trophy",
      url: "/images/awards/awards-1.jpg",
    },
    {
      title:
        "Exclusive algarve team member taking a picture with their award trophy",
      url: "/images/awards/awards-2.jpg",
    },

    {
      title: "Award badge exclusive algarve villas",
      url: "/images/awards/awards-badge.jpg",
    },
    {
      title:
        "Exclusive algarve team member taking a picture with their award trophy",
      url: "/images/awards/awards-1.jpg",
    },
    {
      title:
        "Exclusive algarve team member taking a picture with their award trophy",
      url: "/images/awards/awards-2.jpg",
    },

    {
      title: "Award badge exclusive algarve villas",
      url: "/images/awards/awards-badge.jpg",
    },
    {
      title:
        "Exclusive algarve team member taking a picture with their award trophy",
      url: "/images/awards/awards-1.jpg",
    },
    {
      title:
        "Exclusive algarve team member taking a picture with their award trophy",
      url: "/images/awards/awards-2.jpg",
    },
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
          animation: ${direction === "up" ? "slideUp" : "slideDown"} 60s linear
            infinite;
          will-change: transform;
        }

        ${pauseOnHover
          ? ".sliding-carousel:hover { animation-play-state: paused; }"
          : ""}
      `}</style>

      <ul className="flex flex-col sliding-carousel gap-4 h-max">
        {carouselProducts.map((product, i) => (
          <li
            key={`Awards--Images--Slider--${i}`}
            className="relative h-[424px] w-[270px] flex-none"
          >
            <GridTileImage
              alt={product.title}
              src={product.url}
              fill
              sizes="270px"
              className="object-cover"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
