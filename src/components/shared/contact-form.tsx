"use client";
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

// ContactForm Component
interface FormData {
    name: string;
    email: string;
    phone: string;
    message: string;
    acceptTerms: boolean;
}

interface ContactFormProps {
    theme?: 'dark' | 'light';
    formTitle?: boolean;
    titleStyling?: string;
    submitBtnStyling?: string;
}

export function ContactForm({ theme = 'dark', formTitle = true, titleStyling = "", submitBtnStyling = "" }: ContactFormProps) {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        phone: '',
        message: '',
        acceptTerms: false
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;

        if (type === 'checkbox') {
            const checked = (e.target as HTMLInputElement).checked;
            setFormData(prev => ({
                ...prev,
                [name]: checked
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleSubmit = () => {
        console.log('Form submitted:', formData);
    };

    const inputClasses = theme === 'dark'
        ? "indent-4 bg-white text-black placeholder:text-gray-500 border-none rounded-none py-5 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 placeholder:text-sm"
        : "indent-4 bg-gray-100 text-black placeholder:text-gray-600 border-none rounded-none py-5 focus:ring-2 focus:ring-gray-400 placeholder:text-sm";

    const textareaClasses = theme === 'dark'
        ? "indent-4 bg-white text-black placeholder:text-gray-500 border-none rounded-none py-5 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 min-h-[120px]"
        : "indent-4 bg-gray-100 text-black placeholder:text-gray-600 border-none rounded-none py-5 focus:ring-2 focus:ring-gray-400 min-h-[120px]";

    const checkboxLabelClasses = theme === 'dark' ? "text-white text-xs" : "text-black text-xs";

    return (
        <div className="w-full">
            {formTitle &&
                <h2 className={cn('text-xl lg:text-2xl mb-6 font-semibold', theme === 'dark' ? 'text-white' : 'text-black', titleStyling)}>
                    Contact Us
                </h2>
            }
            <div className="space-y-4">
                <div className="space-y-2">
                    <Input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleInputChange}
                        className={`${inputClasses} w-full`}
                        placeholder="NAME"
                    />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className={inputClasses}
                            placeholder="EMAIL ADDRESS"
                        />
                    </div>

                    <div className="space-y-2">
                        <Input
                            id="phone"
                            name="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className={inputClasses}
                            placeholder="PHONE NUMBER"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        className={`${textareaClasses} w-full`}
                        placeholder="MESSAGE..."
                    />
                </div>

                <div className="flex items-center space-x-3 mt-8">
                    <input
                        type="checkbox"
                        id="acceptTerms"
                        name="acceptTerms"
                        checked={formData.acceptTerms}
                        onChange={handleInputChange}
                        className="my-0 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <label htmlFor="acceptTerms" className={checkboxLabelClasses}>
                        By requesting information you are authorizing Exclusive Algarve Villas to use your data in order to contact you.
                    </label>
                </div>

                <div className='mt-8'>
                    <Button
                        onClick={handleSubmit}
                        disabled={!formData.acceptTerms}
                        className={cn("bg-primary hover:bg-primary/90 text-white font-medium py-5 px-14 rounded-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed", submitBtnStyling)}
                    >
                        Submit
                    </Button>
                </div>
            </div>
        </div>
    );
}