"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Clock, ShieldCheck, User } from 'lucide-react';

const tabs = [
    { label: 'Home', href: '/rider', icon: Home },
    { label: 'My Rides', href: '/rides', icon: Clock },
    { label: 'Safety', href: '/safety', icon: ShieldCheck },
    { label: 'Profile', href: '/profile', icon: User },
];

export default function BottomNav() {
    const pathname = usePathname();

    // Hide bottom nav on active ride screen
    if (pathname?.startsWith('/ride/active')) return null;

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 border-t"
            style={{
                background: 'var(--glass)',
                borderColor: 'var(--card-border)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
            }}
        >
            <div className="flex items-center justify-around max-w-lg mx-auto px-2 py-2">
                {tabs.map((tab) => {
                    const isActive = pathname === tab.href || (tab.href === '/rider' && pathname === '/');
                    return (
                        <Link
                            key={tab.href}
                            href={tab.href}
                            className="flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all duration-200"
                            style={{
                                color: isActive ? 'var(--primary)' : 'var(--secondary)',
                                background: isActive ? 'rgba(31,58,95,0.08)' : 'transparent',
                            }}
                        >
                            <tab.icon size={22} strokeWidth={isActive ? 2.5 : 1.75} />
                            <span className="text-[10px] font-semibold tracking-wide">
                                {tab.label}
                            </span>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}
