"use client";
import React from 'react';
import Link from 'next/link';
import { Car, User, Award } from 'lucide-react';

const Navbar = () => {
    return (
        <nav className="fixed top-0 w-full z-50 glass-card px-6 py-4 flex items-center justify-between border-b border-white/10">
            <Link href="/" className="flex items-center gap-2">
                <div className="bg-primary p-2 rounded-lg">
                    <Car className="text-white w-6 h-6" />
                </div>
                <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                    UniRide
                </span>
            </Link>

            <div className="hidden md:flex items-center gap-8 text-sm font-medium">
                <Link href="/rider" className="hover:text-primary transition-colors">Rider</Link>
                <Link href="/driver" className="hover:text-primary transition-colors">Driver</Link>
                <Link href="/admin" className="hover:text-primary transition-colors">Admin</Link>
                <Link href="/book" className="hover:text-primary transition-colors">Book Ride</Link>
                <Link href="/incentives" className="hover:text-primary transition-colors">Rewards</Link>
            </div>

            <div className="flex items-center gap-4">
                <div className="flex flex-col items-end mr-2">
                    <span className="text-xs text-gray-400">Balance</span>
                    <span className="text-sm font-bold flex items-center gap-1">
                        <Award className="w-3 h-3 text-accent" /> 150
                    </span>
                </div>
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30">
                    <User className="text-primary w-5 h-5" />
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
