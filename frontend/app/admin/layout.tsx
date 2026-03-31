"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const tabs = [
    { label: 'Live Rides', href: '/admin' },
    { label: 'Verifications', href: '/admin/verification' },
    { label: 'Commission', href: '/admin/commission' },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    return (
        <div className="min-h-screen flex flex-col bg-background">
            {/* Top header */}
            <header className="bg-primary">
                <div className="max-w-5xl mx-auto px-5">
                    <div className="flex items-center justify-between py-4">
                        <Link href="/" className="text-lg font-extrabold text-white">UniRide</Link>
                        <span className="text-xs font-medium px-2.5 py-1 rounded-full text-white bg-white/15">
                            Admin
                        </span>
                    </div>
                    {/* Tab navigation */}
                    <div className="flex gap-1 pb-0">
                        {tabs.map(tab => {
                            const isActive = pathname === tab.href;
                            return (
                                <Link key={tab.href} href={tab.href}
                                    className={`px-4 py-2.5 text-sm font-semibold rounded-t-xl transition-all ${isActive ? 'bg-background text-primary' : 'bg-transparent text-white/70'}`}>
                                    {tab.label}
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </header>

            {/* Page content */}
            <main className="flex-1 max-w-5xl mx-auto w-full px-5 py-6">
                {children}
            </main>
        </div>
    );
}
