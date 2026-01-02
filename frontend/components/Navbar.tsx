'use client';

import Link from 'next/link';
import { Button } from './ui/Button';
import { Video } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function Navbar() {
    const pathname = usePathname();
    const isAuthPage = pathname === '/login';
    const isServicePage = pathname === '/service';

    return (
        <nav className="border-b border-border bg-background/50 backdrop-blur-md sticky top-0 z-50">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 font-bold text-xl">
                    <Video className="w-6 h-6 text-primary" />
                    <span>AIVideo<span className="text-primary">.ai</span></span>
                </Link>
                <div className="flex items-center gap-4">
                    {!isAuthPage && !isServicePage && (
                        <Link href="/login">
                            <Button>Get Started</Button>
                        </Link>
                    )}
                    {isServicePage && (
                        <Link href="/">
                            <Button variant="ghost">Logout</Button>
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
}
