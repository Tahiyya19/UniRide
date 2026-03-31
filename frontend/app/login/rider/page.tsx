"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { User, ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { loginAction, signupAction } from '@/app/actions/auth';

type Mode = 'login' | 'signup';

export default function RiderLogin() {
    const [mode, setMode] = useState<Mode>('login');
    const [showPw, setShowPw] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (formData: FormData) => {
        formData.append('role', 'RIDER');
        const res = mode === 'signup' 
            ? await signupAction(formData) 
            : await loginAction(formData);
            
        if (res?.error) setError(res.error);
    };

    return (
        <div className="min-h-screen flex flex-col bg-background">
            <div className="max-w-sm mx-auto w-full px-5 py-8 flex flex-col flex-1">

                {/* Back */}
                <Link href="/" className="flex items-center gap-2 text-sm font-medium mb-8 w-fit text-secondary">
                    <ArrowLeft size={16} /> Back
                </Link>

                {/* Header */}
                <div className="flex items-center gap-3 mb-8">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-primary/10">
                        <User size={22} className="text-primary" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-primary">
                            {mode === 'login' ? 'Rider Login' : 'Create Account'}
                        </h1>
                        <p className="text-xs mt-0.5 text-secondary">
                            {mode === 'login' ? 'Sign in to your UniRide account' : 'Join the UniRide campus network'}
                        </p>
                    </div>
                </div>

                {/* Form */}
                <form action={handleSubmit} className="space-y-4 flex-1">
                    {error && <p className="text-sm text-safety font-semibold">{error}</p>}
                    {mode === 'signup' && (
                        <div>
                            <label className="block text-xs font-semibold mb-1.5 text-primary">Full Name</label>
                            <input name="name" required placeholder="e.g. Arjun Mehta" className="uni-input" autoComplete="name" />
                        </div>
                    )}
                    <div>
                        <label className="block text-xs font-semibold mb-1.5 text-primary">Email (University Domain)</label>
                        <input name="email" required placeholder="e.g. arjun@university.edu" className="uni-input" autoComplete="email" />
                    </div>
                    {mode === 'signup' && (
                        <div>
                            <label className="block text-xs font-semibold mb-1.5 text-primary">Phone Number</label>
                            <input name="phone" required type="tel" placeholder="+91 98765 43210" className="uni-input" autoComplete="tel" />
                        </div>
                    )}
                    <div>
                        <label className="block text-xs font-semibold mb-1.5 text-primary">Password</label>
                        <div className="relative">
                            <input name="password" required type={showPw ? 'text' : 'password'} placeholder="••••••••" className="uni-input pr-10" autoComplete={mode === 'login' ? 'current-password' : 'new-password'} />
                            <button type="button" onClick={() => setShowPw(!showPw)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary">
                                {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                        </div>
                    </div>

                    <button type="submit" className="btn-primary w-full mt-2 text-base py-3">
                        {mode === 'login' ? 'Login' : 'Create Account'}
                    </button>
                </form>

                {/* Toggle */}
                <div className="mt-6 text-center">
                    <p className="text-sm text-secondary">
                        {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
                        <button onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
                            className="font-bold text-primary">
                            {mode === 'login' ? 'Sign Up' : 'Login'}
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
}
