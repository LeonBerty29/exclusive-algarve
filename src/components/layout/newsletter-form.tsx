"use client"
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function NewsletterForm() {
    const [email, setEmail] = useState('');

    const handleSubmit = () => {
        if (email) {
            console.log('Subscribing:', email);
            setEmail('');
        }
    };

    return (
        <div className="flex max-w-lg mx-auto items-stretch">
            <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ENTER YOUR EMAIL"
                className="indent-4 flex-1 h-12 rounded-none bg-black text-white placeholder:text-gray-400 border-none placeholder:text-xs"
                onKeyDown={(e) => {
                    if (e.key === 'Enter' && email) {
                        handleSubmit();
                    }
                }}
            />
            <Button
                onClick={handleSubmit}
                disabled={!email}
                className="bg-primary hover:bg-primary/90 rounded-none text-white px-6 h-12 flex items-center justify-center"
            >
                Subscribe
            </Button>
        </div>
    );
}