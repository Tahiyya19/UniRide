"use client";
import React, { useState } from 'react';
import { ShieldCheck, AlertTriangle, Phone, User } from 'lucide-react';

export default function SafetyPage() {
    const [sosActive, setSosActive] = useState(false);
    const [sosConfirm, setSosConfirm] = useState(false);

    const triggerSos = () => {
        if (!sosConfirm) {
            setSosConfirm(true);
            return;
        }
        setSosActive(true);
        setSosConfirm(false);
    };

    return (
        <div className="space-y-5">
            <div>
                <h1 className="text-xl font-bold flex items-center gap-2" style={{ color: 'var(--primary)' }}>
                    <ShieldCheck size={20} /> Safety Center
                </h1>
                <p className="text-xs mt-0.5" style={{ color: 'var(--secondary)' }}>
                    Active during your ride
                </p>
            </div>

            {/* Active Ride Info */}
            <div className="uni-card space-y-3">
                <div className="flex items-center gap-2 mb-1">
                    <ShieldCheck size={14} style={{ color: 'var(--accent)' }} />
                    <span className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--accent)' }}>
                        Verified Driver
                    </span>
                </div>

                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold"
                        style={{ background: 'var(--primary)' }}>
                        PS
                    </div>
                    <div>
                        <p className="font-bold">Priya Sharma</p>
                        <p className="text-xs" style={{ color: 'var(--secondary)' }}>USN: 1RV20CS045</p>
                    </div>
                </div>

                <div className="rounded-xl p-3 space-y-2"
                    style={{ background: 'var(--background)', border: '1px solid var(--card-border)' }}>
                    <div className="flex justify-between text-xs">
                        <span style={{ color: 'var(--secondary)' }}>Vehicle</span>
                        <span className="font-semibold">Honda City</span>
                    </div>
                    <div className="flex justify-between text-xs">
                        <span style={{ color: 'var(--secondary)' }}>Plate</span>
                        <span className="font-semibold font-mono">KA05 AB 1234</span>
                    </div>
                    <div className="flex justify-between text-xs">
                        <span style={{ color: 'var(--secondary)' }}>UniRide Verification ID</span>
                        <span className="font-semibold font-mono">#UR-2024-7841</span>
                    </div>
                </div>
            </div>

            {/* Passengers */}
            <div className="uni-card space-y-3">
                <p className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--secondary)' }}>
                    Co-Riders
                </p>
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center"
                        style={{ background: 'rgba(31,58,95,0.08)' }}>
                        <User size={14} style={{ color: 'var(--primary)' }} />
                    </div>
                    <div>
                        <p className="text-sm font-semibold">Sneha Rao</p>
                        <p className="text-xs" style={{ color: 'var(--secondary)' }}>1RV22EC012 · Female</p>
                    </div>
                </div>
            </div>

            {/* Share / Call */}
            <div className="grid grid-cols-2 gap-3">
                <button className="flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-all"
                    style={{ background: 'rgba(31,58,95,0.06)', color: 'var(--primary)', border: '1.5px solid rgba(31,58,95,0.12)' }}>
                    🔗 Share Ride
                </button>
                <button className="flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-all"
                    style={{ background: 'var(--background)', color: 'var(--primary)', border: '1.5px solid var(--card-border)' }}>
                    <Phone size={14} /> Call Driver
                </button>
            </div>

            {/* SOS */}
            {sosActive ? (
                <div className="uni-card text-center confirm-appear space-y-2"
                    style={{ border: '2px solid var(--safety)', background: 'rgba(230,57,70,0.04)' }}>
                    <AlertTriangle size={28} className="mx-auto" style={{ color: 'var(--safety)' }} />
                    <p className="font-bold" style={{ color: 'var(--safety)' }}>SOS Alert Sent</p>
                    <p className="text-xs" style={{ color: 'var(--secondary)' }}>
                        University admin and campus security have been notified with your live location.
                    </p>
                </div>
            ) : (
                <div className="space-y-2">
                    {sosConfirm && (
                        <p className="text-center text-xs font-semibold confirm-appear" style={{ color: 'var(--safety)' }}>
                            Tap again to confirm emergency alert
                        </p>
                    )}
                    <button
                        onClick={triggerSos}
                        className="btn-safety w-full text-base gap-2 py-4"
                        style={{ transform: sosConfirm ? 'scale(1.02)' : 'scale(1)' }}
                    >
                        <AlertTriangle size={18} />
                        {sosConfirm ? 'CONFIRM SOS ALERT' : 'SOS Emergency'}
                    </button>
                    {sosConfirm && (
                        <button onClick={() => setSosConfirm(false)}
                            className="w-full text-center text-xs py-2"
                            style={{ color: 'var(--secondary)' }}>
                            Cancel
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}
