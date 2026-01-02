'use client';

import Link from 'next/link';
import { Button } from './ui/Button';
import { Video, LogOut } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { clsx } from 'clsx';

export default function Navbar() {
    const pathname = usePathname();
    const isAuthPage = pathname === '/login';
    const isServicePage = pathname === '/service';
    const [activeSection, setActiveSection] = useState('');

    // Handle smooth scroll to features
    const scrollToFeatures = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        const element = document.getElementById('features');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // Scroll spy to highlight active section
    useEffect(() => {
        const handleScroll = () => {
            const featuresSection = document.getElementById('features');
            if (featuresSection) {
                const rect = featuresSection.getBoundingClientRect();
                if (rect.top <= 100 && rect.bottom >= 100) {
                    setActiveSection('features');
                } else {
                    setActiveSection('');
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-background/60 backdrop-blur-md transition-all duration-300">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 font-bold text-xl hover:opacity-90 transition-opacity">
                    <Video className="w-6 h-6 text-primary" />
                    <span>AIVideo<span className="text-primary">.Ai</span></span>
                </Link>

                <div className="flex items-center gap-6">
                    {/* Features Link - Visible on Landing and Service pages */}
                    {!isAuthPage && (
                        <Link
                            href={isServicePage ? "/#features" : "#features"}
                            onClick={isServicePage ? undefined : scrollToFeatures}
                            className={clsx(
                                "text-sm font-medium transition-colors hover:text-primary",
                                activeSection === 'features' && !isServicePage ? "text-primary" : "text-foreground/80"
                            )}
                        >
                            Features
                        </Link>
                    )}

                    {/* Authentication Buttons */}
                    {!isAuthPage && !isServicePage && (
                        <Link href="/login">
                            <Button>Get Started</Button>
                        </Link>
                    )}

                    {(isAuthPage) && (
                        <Link href="/">
                            <Button variant="ghost" size="sm">Back to Home</Button>
                        </Link>
                    )}

                    {isServicePage && (
                        <Link href="/">
                            <Button variant="secondary" className="gap-2 hover:bg-red-500/10 hover:text-red-500 hover:border-red-500/50 transition-all duration-300">
                                <LogOut className="w-4 h-4" />
                                Logout
                            </Button>
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
}
