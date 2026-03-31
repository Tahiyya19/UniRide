"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { ShieldCheck, ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { loginAction } from '@/app/actions/auth';

export default function AdminLogin() {
    const [showPw, setShowPw] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (formData: FormData) => {
        const res = await loginAction(formData);
        if (res?.error) setError(res.error);
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-background">
            <div className="max-w-sm mx-auto w-full px-5 py-10">

                <Link href="/" className="flex items-center gap-2 text-sm font-medium mb-10 w-fit text-secondary">
                    <ArrowLeft size={16} /> Back
                </Link>

                <div className="flex items-center gap-3 mb-8">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-secondary/10">
                        <ShieldCheck size={22} className="text-secondary" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-primary">Admin Login</h1>
                        <p className="text-xs mt-0.5 text-secondary">University administrator access only</p>
                    </div>
                </div>

                <form action={handleSubmit} className="space-y-4">
                    {error && <p className="text-sm text-safety font-semibold">{error}</p>}
                    <div>
                        <label className="block text-xs font-semibold mb-1.5 text-primary">Username (Email)</label>
                        <input name="email" required placeholder="admin@university.edu" className="uni-input" />
                    </div>
                    <div>
                        <label className="block text-xs font-semibold mb-1.5 text-primary">Password</label>
                        <div className="relative">
                            <input name="password" required type={showPw ? 'text' : 'password'} placeholder="••••••••" className="uni-input pr-10" />
                            <button type="button" onClick={() => setShowPw(!showPw)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary">
                                {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                        </div>
                    </div>
                    <button type="submit" className="btn-primary w-full mt-2 py-3 text-base">Login</button>
                </form>

                <p className="mt-6 text-center text-xs text-secondary">
                    Admin accounts are provisioned by the university IT team.
                </p>
            </div>
        </div>
    );
}
