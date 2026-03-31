"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MapPin, Award, User } from 'lucide-react';

const tabs = [
    { label: 'Book Ride', href: '/rider', icon: MapPin },
    { label: 'Rewards', href: '/rider/rewards', icon: Award },
    { label: 'Profile', href: '/rider/profile', icon: User },
];

export default function RiderLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    return (
        <div className="min-h-screen flex flex-col" style={{ background: 'var(--background)' }}>
            {/* Top bar */}
            <header className="flex items-center justify-between px-5 py-4 border-b"
                style={{ background: 'white', borderColor: 'rgba(31,58,95,0.08)' }}>
                <Link href="/" className="text-lg font-extrabold" style={{ color: '#1F3A5F' }}>
                    UniRide
                </Link>
                <span className="text-xs font-medium px-2.5 py-1 rounded-full"
                    style={{ background: 'rgba(46,139,87,0.1)', color: '#2E8B57' }}>
                    Rider
                </span>
            </header>

            {/* Page content */}
            <main className="flex-1 max-w-lg mx-auto w-full px-4 pt-5 pb-24">
                {children}
            </main>

            {/* Bottom nav */}
            <nav className="fixed bottom-0 left-0 right-0 z-50 border-t"
                style={{ background: 'white', borderColor: 'rgba(31,58,95,0.08)' }}>
                <div className="flex items-center justify-around max-w-lg mx-auto px-2 py-2">
                    {tabs.map((tab) => {
                        const isActive = pathname === tab.href;
                        return (
                            <Link key={tab.href} href={tab.href}
                                className="flex flex-col items-center gap-1 px-5 py-2 rounded-xl transition-all"
                                style={{
                                    color: isActive ? '#1F3A5F' : '#6B7280',
                                    background: isActive ? 'rgba(31,58,95,0.07)' : 'transparent',
                                }}>
                                <tab.icon size={21} strokeWidth={isActive ? 2.5 : 1.75} />
                                <span className="text-[10px] font-semibold">{tab.label}</span>
                            </Link>
                        );
                    })}
                </div>
            </nav>
        </div>
    );
}
