"use client";
import React from 'react';
import { Award, Star, MapPin } from 'lucide-react';

const STATS = { totalRides: 127, rating: 4.8, coins: 680 };

function calcCoins(rides: number, rating: number, consistent: boolean) {
    return Math.round(rides * rating * (consistent ? 1.2 : 1));
}

export default function DriverRewardsPage() {
    const projected = calcCoins(STATS.totalRides, STATS.rating, true);

    return (
        <div className="space-y-5">
            <div>
                <h1 className="text-xl font-bold" style={{ color: '#1F3A5F' }}>Driver Rewards</h1>
                <p className="text-xs mt-0.5" style={{ color: '#6B7280' }}>Your performance and coin earnings</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3">
                {[
                    { label: 'Total Rides', value: STATS.totalRides, icon: MapPin, color: '#1F3A5F', bg: 'rgba(31,58,95,0.05)' },
                    { label: 'Rating', value: STATS.rating.toFixed(1), icon: Star, color: '#2E8B57', bg: 'rgba(46,139,87,0.06)' },
                    { label: 'Coins', value: STATS.coins, icon: Award, color: '#1F3A5F', bg: 'rgba(31,58,95,0.05)' },
                ].map((s, i) => (
                    <div key={i} className="uni-card flex flex-col items-center gap-1.5 text-center py-3">
                        <s.icon size={18} color={s.color} />
                        <p className="text-xl font-black" style={{ color: s.color }}>{s.value}</p>
                        <p className="text-[10px]" style={{ color: '#6B7280' }}>{s.label}</p>
                    </div>
                ))}
            </div>

            {/* Coins breakdown */}
            <div className="uni-card space-y-4">
                <p className="text-sm font-bold" style={{ color: '#1F3A5F' }}>Coin Calculation</p>
                <div className="space-y-3 text-sm">
                    {[
                        { label: 'Ride Count Bonus', value: `${STATS.totalRides} × 1` },
                        { label: 'Rating Multiplier', value: `× ${STATS.rating}` },
                        { label: 'Consistency Bonus', value: '+ 20%' },
                    ].map((row, i) => (
                        <div key={i} className="flex justify-between items-center py-2 border-b"
                            style={{ borderColor: 'rgba(31,58,95,0.06)' }}>
                            <span style={{ color: '#6B7280' }}>{row.label}</span>
                            <span className="font-semibold" style={{ color: '#1F3A5F' }}>{row.value}</span>
                        </div>
                    ))}
                    <div className="flex justify-between items-center pt-1">
                        <span className="font-bold" style={{ color: '#1F3A5F' }}>Projected Total</span>
                        <span className="text-xl font-black" style={{ color: '#2E8B57' }}>{projected}</span>
                    </div>
                </div>
            </div>

            {/* Tips */}
            <div className="uni-card space-y-2"
                style={{ background: 'rgba(31,58,95,0.03)', border: '1px solid rgba(31,58,95,0.08)' }}>
                <p className="text-xs font-bold uppercase tracking-wider" style={{ color: '#6B7280' }}>How to earn more</p>
                {['Complete more rides to boost your count bonus', 'Maintain high ratings for a rating multiplier', 'Drive consistently every week for the 20% bonus'].map((tip, i) => (
                    <p key={i} className="text-xs flex gap-2" style={{ color: '#6B7280' }}>
                        <span>•</span> {tip}
                    </p>
                ))}
            </div>
        </div>
    );
}
