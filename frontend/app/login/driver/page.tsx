"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { Car, ArrowLeft, Eye, EyeOff, Upload, CheckCircle } from 'lucide-react';
import { loginAction, signupAction } from '@/app/actions/auth';

type Mode = 'login' | 'signup';

export default function DriverLogin() {
    const [mode, setMode] = useState<Mode>('login');
    const [showPw, setShowPw] = useState(false);
    const [vehicleType, setVehicleType] = useState<'2-Wheeler' | '4-Wheeler'>('4-Wheeler');
    const [licenseUploaded, setLicenseUploaded] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (formData: FormData) => {
        formData.append('role', 'DRIVER');
        
        let res;
        if (mode === 'signup') {
            res = await signupAction(formData);
            if (!res?.error) {
                setSubmitted(true);
                return;
            }
        } else {
            res = await loginAction(formData);
        }
        
        if (res?.error) setError(res.error);
    };

    if (submitted) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center px-5 bg-background">
                <div className="max-w-sm w-full text-center space-y-4">
                    <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto bg-accent/10">
                        <CheckCircle size={32} className="text-accent" />
                    </div>
                    <h2 className="text-xl font-bold text-primary">Application Submitted</h2>
                    <p className="text-sm leading-relaxed text-secondary">
                        Your driver application is pending verification by the university admin. You will be notified once approved.
                    </p>
                    <div className="p-3 rounded-xl text-xs font-semibold bg-safety/5 text-safety border border-safety/15">
                        Status: Pending Verification
                    </div>
                    <Link href="/" className="block btn-primary w-full mt-4">Back to Home</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col bg-background">
            <div className="max-w-sm mx-auto w-full px-5 py-8 flex flex-col">

                <Link href="/" className="flex items-center gap-2 text-sm font-medium mb-8 w-fit text-secondary">
                    <ArrowLeft size={16} /> Back
                </Link>

                <div className="flex items-center gap-3 mb-8">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-accent/10">
                        <Car size={22} className="text-accent" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-primary">
                            {mode === 'login' ? 'Driver Login' : 'Driver Registration'}
                        </h1>
                        <p className="text-xs mt-0.5 text-secondary">
                            {mode === 'login' ? 'Sign in to your driver account' : 'Register as a UniRide driver'}
                        </p>
                    </div>
                </div>

                <form action={handleSubmit} className="space-y-4">
                    {error && <p className="text-sm text-safety font-semibold">{error}</p>}
                    {mode === 'signup' && (
                        <div>
                            <label className="block text-xs font-semibold mb-1.5 text-primary">Full Name</label>
                            <input name="name" required placeholder="e.g. Priya Sharma" className="uni-input" autoComplete="name" />
                        </div>
                    )}
                    <div>
                        <label className="block text-xs font-semibold mb-1.5 text-primary">Email (University Domain)</label>
                        <input name="email" required placeholder="e.g. priya@university.edu" className="uni-input" autoComplete="email" />
                    </div>
                    {mode === 'signup' && (
                        <>
                            <div>
                                <label className="block text-xs font-semibold mb-1.5 text-primary">Phone Number</label>
                                <input name="phone" required type="tel" placeholder="+91 98765 43210" className="uni-input" autoComplete="tel" />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold mb-2 text-primary">Vehicle Type</label>
                                <div className="grid grid-cols-2 gap-2">
                                    {(['2-Wheeler', '4-Wheeler'] as const).map(t => (
                                        <button key={t} type="button" onClick={() => setVehicleType(t)}
                                            className={`py-2.5 rounded-xl text-sm font-semibold border transition-all ${vehicleType === t ? 'bg-primary text-white border-primary' : 'bg-white text-secondary border-card-border'}`}>
                                            {t}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-semibold mb-1.5 text-primary">Vehicle Number</label>
                                <input name="vehicleNumber" required placeholder="e.g. KA05 AB 1234" className="uni-input" />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold mb-1.5 text-primary">License Upload</label>
                                <label
                                    className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${licenseUploaded ? 'border-accent bg-accent/5' : 'border-card-border bg-white'}`}>
                                    <input type="file" accept="image/*,.pdf" className="sr-only"
                                        onChange={() => setLicenseUploaded(true)} />
                                    {licenseUploaded
                                        ? <CheckCircle size={18} className="text-accent" />
                                        : <Upload size={18} className="text-secondary" />
                                    }
                                    <span className={`text-sm ${licenseUploaded ? 'text-accent' : 'text-secondary'}`}>
                                        {licenseUploaded ? 'License uploaded' : 'Upload driver license'}
                                    </span>
                                </label>
                            </div>
                        </>
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

                    <button type="submit" className="btn-primary w-full mt-2 py-3 text-base">
                        {mode === 'login' ? 'Login' : 'Submit Application'}
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-sm text-secondary">
                        {mode === 'login' ? "New driver? " : 'Already registered? '}
                        <button onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
                            className="font-bold text-primary">
                            {mode === 'login' ? 'Register' : 'Login'}
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
}
