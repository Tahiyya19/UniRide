"use client";
import React from 'react';
import GlassCard from '@/components/GlassCard';
import { Leaf, Award, ShoppingCart, Info, TrendingDown, Coffee, Printer, Library } from 'lucide-react';

const IncentivesPage = () => {
    const coinBalance = 150;
    const co2Saved = 12.5;

    const redemptions = [
        { name: "Cafeteria Voucher", coins: 50, icon: Coffee, desc: "₹50 off on any meal" },
        { name: "Printing Credits", coins: 20, icon: Printer, desc: "10 free color prints" },
        { name: "Library Pro", coins: 100, icon: Library, desc: "Extra 2 book issues" },
    ];

    const history = [
        { date: "Yesterday", event: "Ride Sharing Reward", coins: "+15", co2: "0.4kg saved" },
        { date: "24 Feb", event: "Driver Consistency Bonus", coins: "+45", co2: "-" },
        { date: "22 Feb", event: "Coffee Redemption", coins: "-50", co2: "-" },
    ];

    return (
        <div className="space-y-8 pb-12">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold flex items-center gap-3">
                        <Award className="w-8 h-8 text-accent" /> Campus Rewards
                    </h1>
                    <p className="text-gray-400 mt-1">Your contribution to a greener campus</p>
                </div>
            </div>

            {/* Major Balance Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <GlassCard className="bg-gradient-to-br from-accent/20 to-transparent border-accent/20">
                    <p className="text-sm uppercase tracking-widest text-accent font-bold">Current Balance</p>
                    <div className="flex items-center gap-4 mt-2">
                        <Award className="w-12 h-12 text-accent" />
                        <span className="text-5xl font-black">{coinBalance}</span>
                        <span className="text-xl text-gray-400 self-end mb-1">Coins</span>
                    </div>
                </GlassCard>

                <GlassCard className="bg-gradient-to-br from-green-500/20 to-transparent border-green-500/20">
                    <p className="text-sm uppercase tracking-widest text-green-500 font-bold">Carbon Footprint Reduced</p>
                    <div className="flex items-center gap-4 mt-2">
                        <Leaf className="w-12 h-12 text-green-500" />
                        <span className="text-5xl font-black">{co2Saved}</span>
                        <span className="text-xl text-gray-400 self-end mb-1">kg CO₂</span>
                    </div>
                </GlassCard>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Redemption Options */}
                <div className="lg:col-span-2 space-y-6">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <ShoppingCart className="w-5 h-5 text-primary" /> Redeem Your Coins
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {redemptions.map((item, i) => (
                            <GlassCard key={i} className="hover:border-primary/40 transition-all group">
                                <item.icon className="w-8 h-8 text-primary mb-3 group-hover:scale-110 transition-transform" />
                                <h3 className="font-bold text-lg">{item.name}</h3>
                                <p className="text-xs text-gray-400 mb-4">{item.desc}</p>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm font-bold bg-accent/10 px-2 py-1 rounded text-accent">
                                        {item.coins} Coins
                                    </span>
                                    <button className="text-xs font-bold text-primary hover:underline">Redeem Now</button>
                                </div>
                            </GlassCard>
                        ))}
                    </div>
                </div>

                {/* History & Info */}
                <div className="space-y-6">
                    <h2 className="text-xl font-bold">Activity Log</h2>
                    <GlassCard>
                        <div className="space-y-4">
                            {history.map((log, i) => (
                                <div key={i} className="flex justify-between items-center text-sm border-b border-white/5 pb-2">
                                    <div>
                                        <p className="font-bold">{log.event}</p>
                                        <p className="text-[10px] text-gray-400">{log.date} {log.co2 !== "-" && `• ${log.co2}`}</p>
                                    </div>
                                    <span className={`font-bold ${log.coins.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                                        {log.coins}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </GlassCard>

                    <GlassCard title="How it works" className="border-primary/10">
                        <div className="space-y-4">
                            <div className="flex gap-3 items-start">
                                <TrendingDown className="w-4 h-4 text-green-500 shrink-0 mt-1" />
                                <p className="text-[10px] text-gray-400">
                                    Sharing rides reduces the per-person carbon footprint compared to solo travel.
                                </p>
                            </div>
                            <div className="flex gap-3 items-start">
                                <Info className="w-4 h-4 text-primary shrink-0 mt-1" />
                                <p className="text-[10px] text-gray-400">
                                    Every 1kg of CO₂ saved converts to 10 Campus Coins, redeemable at partner university outlets.
                                </p>
                            </div>
                        </div>
                    </GlassCard>
                </div>
            </div>
        </div>
    );
};

export default IncentivesPage;
