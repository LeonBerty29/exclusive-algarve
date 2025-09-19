import { ClientTestimonialCard } from "@/components/client-testimonials/client-testimonials-card";
import { getTestimonials } from "@/data/testimonials";

const Page = async () => {
  const testimonials = await getTestimonials();
  // console.log({ testimonials });

  return (
    <div className="2xl:container w-full mx-auto px-6 sm:px-8 md:px-10 lg:px-14 py-16">
      <div className="flex flex-col gap-4 md:gap-6 lg:gap-8">
        {testimonials.data.map((testimonial, index) => (
          <ClientTestimonialCard key={`${index}-${index}`} data={testimonial} />
        ))}
      </div>
    </div>
  );
};

export default Page;
