"use client";
import React, { useState } from 'react';
import { Leaf, Award } from 'lucide-react';

const CO2_DATA = { total: 12.4, sharedDistance: 284 };
const COINS = { earned: 320, available: 150 };
const REDEEM_LOCATIONS = [
    { name: 'Cafeteria', desc: '10% off food', coins: 50, emoji: '🍽️' },
    { name: 'Printing', desc: '₹10 off printing', coins: 30, emoji: '🖨️' },
    { name: 'Stationery', desc: '5% on supplies', coins: 20, emoji: '📝' },
];

export default function RiderRewardsPage() {
    const [available, setAvailable] = useState(COINS.available);
    const [redeemed, setRedeemed] = useState<number[]>([]);

    const redeem = (idx: number, cost: number) => {
        if (available < cost || redeemed.includes(idx)) return;
        setAvailable(a => a - cost);
        setRedeemed(r => [...r, idx]);
    };

    return (
        <div className="space-y-5">
            <div>
                <h1 className="text-xl font-bold" style={{ color: '#1F3A5F' }}>Rewards</h1>
                <p className="text-xs mt-0.5" style={{ color: '#6B7280' }}>Your sustainability & campus coins summary</p>
            </div>

            {/* CO2 Reduction */}
            <div className="uni-card space-y-4">
                <div className="flex items-center gap-2">
                    <Leaf size={16} color="#2E8B57" />
                    <p className="font-bold text-sm">CO₂ Reduction</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 rounded-xl text-center" style={{ background: 'rgba(46,139,87,0.06)', border: '1px solid rgba(46,139,87,0.15)' }}>
                        <p className="text-2xl font-black" style={{ color: '#2E8B57' }}>{CO2_DATA.total} kg</p>
                        <p className="text-[10px] mt-1" style={{ color: '#6B7280' }}>Total CO₂ Reduced</p>
                    </div>
                    <div className="p-3 rounded-xl text-center" style={{ background: 'rgba(31,58,95,0.05)', border: '1px solid rgba(31,58,95,0.1)' }}>
                        <p className="text-2xl font-black" style={{ color: '#1F3A5F' }}>{CO2_DATA.sharedDistance} km</p>
                        <p className="text-[10px] mt-1" style={{ color: '#6B7280' }}>Total Shared Distance</p>
                    </div>
                </div>
            </div>

            {/* Campus Coins */}
            <div className="uni-card space-y-4">
                <div className="flex items-center gap-2">
                    <Award size={16} color="#1F3A5F" />
                    <p className="font-bold text-sm">Campus Coins</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 rounded-xl" style={{ background: 'rgba(31,58,95,0.04)', border: '1px solid rgba(31,58,95,0.08)' }}>
                        <p className="text-2xl font-black" style={{ color: '#1F3A5F' }}>{COINS.earned}</p>
                        <p className="text-[10px] mt-1" style={{ color: '#6B7280' }}>Total Earned</p>
                    </div>
                    <div className="p-3 rounded-xl" style={{ background: available > 0 ? 'rgba(46,139,87,0.06)' : 'rgba(107,114,128,0.06)', border: '1px solid rgba(46,139,87,0.15)' }}>
                        <p className="text-2xl font-black" style={{ color: available > 0 ? '#2E8B57' : '#6B7280' }}>{available}</p>
                        <p className="text-[10px] mt-1" style={{ color: '#6B7280' }}>Available</p>
                    </div>
                </div>
            </div>

            {/* Redemption Grid */}
            <div>
                <h2 className="text-sm font-bold mb-3" style={{ color: '#1F3A5F' }}>Redeem At</h2>
                <div className="grid grid-cols-3 gap-3">
                    {REDEEM_LOCATIONS.map((loc, i) => {
                        const isRedeemed = redeemed.includes(i);
                        const canAfford = available >= loc.coins;
                        return (
                            <button key={i} onClick={() => redeem(i, loc.coins)}
                                disabled={!canAfford || isRedeemed}
                                className="flex flex-col items-center gap-2 p-3 rounded-xl border transition-all"
                                style={{
                                    background: isRedeemed ? 'rgba(46,139,87,0.08)' : 'white',
                                    borderColor: isRedeemed ? 'rgba(46,139,87,0.3)' : 'rgba(31,58,95,0.1)',
                                    opacity: !canAfford && !isRedeemed ? 0.5 : 1,
                                }}>
                                <span className="text-2xl">{loc.emoji}</span>
                                <p className="text-xs font-bold text-center" style={{ color: '#1F3A5F' }}>{loc.name}</p>
                                <p className="text-[10px] text-center" style={{ color: '#6B7280' }}>{loc.desc}</p>
                                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                                    style={{ background: isRedeemed ? 'rgba(46,139,87,0.15)' : 'rgba(31,58,95,0.08)', color: isRedeemed ? '#2E8B57' : '#1F3A5F' }}>
                                    {isRedeemed ? '✓ Used' : `${loc.coins} coins`}
                                </span>
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
