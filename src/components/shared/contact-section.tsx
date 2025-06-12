import { cn } from "@/lib/utils";
import { ContactForm } from "./contact-form";
import Image from "next/image";

interface ContactSectionProps {
    theme?: 'dark' | 'light';
    backgroundColor?: string;
    title?: string;
    description?: string;
    imageSrc?: string;
    imageAlt?: string;
    highlightText?: string;
    formTitle?: boolean;
}

export function ContactSection({
    theme = 'dark',
    backgroundColor,
    title = 'HAVE ANY QUESTION ?',
    description = 'Exclusive Algarve Villas has won various awards over the years, from "Best Real Estate Agency Website" to "Best Real Estate Agency Portugal" by the International Property Awards in London. Furthermore has also won an award in 2019 by Best Luxury Real Estate Agency 2019 by Build Magazine.',
    imageSrc = '/images/team/team.png',
    imageAlt = 'photo of exclusive algarve team members',
    highlightText = '"Best Real Estate Agency Portugal"',
    formTitle = true
}: ContactSectionProps) {

    // Theme-based text colors
    const headingColor = theme === 'dark' ? 'text-primary' : 'text-black';
    const mutedTextColor = theme === 'dark' ? 'text-white/70' : 'text-black/70';
    const highlightColor = theme === 'dark' ? 'text-white' : 'text-black';

    return (
        <div className={cn(backgroundColor ? backgroundColor : theme == "dark" ? "bg-neutral-800" : "bg-white")}>
            <div className='lg:container mx-auto px-6 md:px-12 lg:px-14 py-14'>
                <div className='flex items-center gap-6 justify-between py-5 md:py-8 flex-wrap'>
                    <div className='w-full lg:w-[47%] 2xl:w-[44%]'>
                        <h2 className={`text-xl lg:text-2xl sm:max-w-70 mb-6 font-semibold ${headingColor}`}>
                            {title}
                        </h2>

                        {imageSrc &&
                            (
                                <div className='relative h-70 w-[85%] mb-7'>
                                    <Image
                                        src={imageSrc}
                                        alt={imageAlt}
                                        width={100}
                                        height={100}
                                        className='w-full h-full object-cover'
                                    />
                                </div>
                            )
                        }

                        <p className={`${mutedTextColor} text-sm xl:text-base mb-5`}>
                            {description.split(highlightText)[0]}
                            <span className={highlightColor}>{highlightText}</span>
                            {description.split(highlightText)[1]}
                        </p>
                    </div>

                    <div className='w-full lg:w-[47%] 2xl:w-[44%] flex justify-end'>
                        <ContactForm theme={theme} formTitle={formTitle} />
                    </div>
                </div>
            </div>
        </div>
    );
}