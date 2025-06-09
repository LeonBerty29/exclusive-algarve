"use client";
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface FormData {
    firstName: string;
    lastName: string;
    email: string;
    message: string;
}

export function MessageForm() {
    const [formData, setFormData] = useState<FormData>({
        firstName: '',
        lastName: '',
        email: '',
        message: ''
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = () => {
        console.log('Form submitted:', formData);
        // Handle form submission here
        // You can add validation, API calls, etc.
    };

    return (
        <div className="w-full max-w-md">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center"></h2>

            <div className="space-y-4">
                {/* First Name and Last Name Row */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Input
                            id="firstName"
                            name="firstName"
                            type="text"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            className="indent-4 bg-black text-white placeholder:text-gray-400 border-none rounded-none py-5 focus:border-white focus:ring-white"
                            placeholder="Enter first name"
                        />
                    </div>

                    <div className="space-y-2">
                        <Input
                            id="lastName"
                            name="lastName"
                            type="text"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            className="indent-4 bg-black text-white placeholder:text-gray-400 border-none rounded-none py-5 focus:border-white focus:ring-white"
                            placeholder="Enter last name"
                        />
                    </div>
                </div>

                {/* Email Field */}
                <div className="space-y-2">
                    <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="indent-4 bg-black text-white placeholder:text-gray-400 border-none rounded-none py-5 focus:border-white focus:ring-white w-full"
                        placeholder="Enter your email address"
                    />
                </div>

                {/* Message Textarea */}
                <div className="space-y-2">
                    
                    <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        className="indent-4 bg-black text-white placeholder:text-gray-400 border-none rounded-none py-5 focus:border-white focus:ring-white w-full min-h-[120px]"
                        placeholder="Enter your message here..."
                    />
                </div>

                {/* Submit Button */}
                <Button
                    onClick={handleSubmit}
                    className=" bg-primary hover:bg-primary/90 text-white font-medium py-5 px-8 rounded-none transition-colors"
                >
                    Send Message
                </Button>
            </div>
        </div>
    );
}