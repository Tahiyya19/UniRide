"use client";
import React, { useState } from 'react';
import { User, Award, Clock, LogOut } from 'lucide-react';

const MOCK_HISTORY = [
    { id: 1, from: 'University', to: 'East Hostel', date: 'Mar 8, 2026', fare: 35, status: 'Completed' },
    { id: 2, from: 'Library', to: 'Canteen', date: 'Mar 7, 2026', fare: 20, status: 'Completed' },
    { id: 3, from: 'Main Gate', to: 'PG Area', date: 'Mar 5, 2026', fare: 55, status: 'Cancelled' },
];

const COIN_REDEEMABLE = [
    { label: 'Cafeteria', discount: '10% off', coins: 50 },
    { label: 'Printing Centre', discount: '₹10 off', coins: 30 },
    { label: 'Stationery Shop', discount: '5% off', coins: 20 },
];

export default function ProfilePage() {
    const [coins] = useState(150);
    const [showRedeem, setShowRedeem] = useState(false);

    return (
        <div className="space-y-5">
            {/* Header */}
            <div>
                <h1 className="text-xl font-bold" style={{ color: 'var(--primary)' }}>Profile</h1>
            </div>

            {/* User Card */}
            <div className="uni-card flex items-center gap-4">
                <div className="w-14 h-14 rounded-full flex items-center justify-center text-white text-xl font-bold flex-shrink-0"
                    style={{ background: 'var(--primary)' }}>
                    <User size={24} />
                </div>
                <div>
                    <p className="font-bold text-base">Arjun Mehta</p>
                    <p className="text-xs" style={{ color: 'var(--secondary)' }}>USN: 1RV21CS045</p>
                    <p className="text-xs" style={{ color: 'var(--secondary)' }}>Student · Rider</p>
                </div>
            </div>

            {/* Campus Coins */}
            <div className="uni-card space-y-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Award size={16} style={{ color: 'var(--accent)' }} />
                        <span className="font-semibold text-sm">Campus Coins</span>
                    </div>
                    <span className="text-2xl font-black" style={{ color: 'var(--accent)' }}>{coins}</span>
                </div>
                <button
                    onClick={() => setShowRedeem(!showRedeem)}
                    className="w-full py-2.5 rounded-xl text-sm font-semibold transition-all"
                    style={{ background: 'rgba(46,139,87,0.08)', color: 'var(--accent)', border: '1px solid rgba(46,139,87,0.2)' }}
                >
                    {showRedeem ? 'Hide' : 'Redeem Coins'}
                </button>

                {showRedeem && (
                    <div className="space-y-2 confirm-appear">
                        {COIN_REDEEMABLE.map((r, i) => (
                            <div key={i} className="flex items-center justify-between p-3 rounded-xl"
                                style={{ background: 'var(--background)', border: '1px solid var(--card-border)' }}>
                                <div>
                                    <p className="text-sm font-semibold">{r.label}</p>
                                    <p className="text-xs" style={{ color: 'var(--secondary)' }}>{r.discount}</p>
                                </div>
                                <button disabled={coins < r.coins}
                                    className="px-3 py-1.5 rounded-lg text-xs font-bold transition-all"
                                    style={{
                                        background: coins >= r.coins ? 'var(--accent)' : 'var(--background)',
                                        color: coins >= r.coins ? 'white' : 'var(--secondary)',
                                        border: '1px solid var(--card-border)',
                                        opacity: coins >= r.coins ? 1 : 0.5,
                                    }}>
                                    {r.coins} coins
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Subscription */}
            <div className="uni-card space-y-2">
                <p className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--secondary)' }}>Subscription</p>
                <p className="text-sm" style={{ color: 'var(--secondary)' }}>No active plan</p>
                <button className="btn-primary w-full text-sm py-2.5">View Plans</button>
            </div>

            {/* Ride History */}
            <div>
                <h2 className="text-sm font-bold mb-3 flex items-center gap-2" style={{ color: 'var(--primary)' }}>
                    <Clock size={14} /> Recent Rides
                </h2>
                <div className="space-y-2">
                    {MOCK_HISTORY.map(r => (
                        <div key={r.id} className="uni-card flex items-center justify-between">
                            <div>
                                <p className="text-sm font-semibold">{r.from} → {r.to}</p>
                                <p className="text-xs" style={{ color: 'var(--secondary)' }}>{r.date}</p>
                            </div>
                            <div className="text-right flex-shrink-0">
                                <p className="text-sm font-bold">₹{r.fare}</p>
                                <p className="text-[10px] font-semibold uppercase"
                                    style={{ color: r.status === 'Completed' ? 'var(--accent)' : 'var(--safety)' }}>
                                    {r.status}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Logout */}
            <button className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold"
                style={{ color: 'var(--safety)', border: '1.5px solid rgba(230,57,70,0.15)', background: 'rgba(230,57,70,0.04)' }}>
                <LogOut size={14} /> Sign Out
            </button>
        </div>
    );
}
