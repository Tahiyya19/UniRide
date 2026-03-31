"use client";
import React from 'react';
import { Phone, BookOpen, Award, Clock, Leaf } from 'lucide-react';

const RIDER = { name: 'Arjun Mehta', usn: '1RV21CS045', phone: '+91 98765 43210' };
const RIDES_HISTORY = [
    { from: 'Library', to: 'East Hostel', date: 'Mar 8', fare: 35, status: 'Completed' },
    { from: 'Main Gate', to: 'Metro Stn', date: 'Mar 7', fare: 55, status: 'Completed' },
    { from: 'Canteen', to: 'Sports Block', date: 'Mar 5', fare: 22, status: 'Cancelled' },
];

export default function RiderProfilePage() {
    return (
        <div className="space-y-5">
            <div>
                <h1 className="text-xl font-bold" style={{ color: '#1F3A5F' }}>Profile</h1>
            </div>

            {/* User Info */}
            <div className="uni-card flex items-center gap-4">
                <div className="w-14 h-14 rounded-full flex items-center justify-center text-white text-xl font-bold flex-shrink-0"
                    style={{ background: '#1F3A5F' }}>
                    {RIDER.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="space-y-1">
                    <p className="font-bold text-base">{RIDER.name}</p>
                    <div className="flex items-center gap-2 text-xs" style={{ color: '#6B7280' }}>
                        <BookOpen size={11} /> {RIDER.usn}
                    </div>
                    <div className="flex items-center gap-2 text-xs" style={{ color: '#6B7280' }}>
                        <Phone size={11} /> {RIDER.phone}
                    </div>
                </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-3">
                {[
                    { label: 'Coins', value: '150', icon: Award, color: '#1F3A5F', bg: 'rgba(31,58,95,0.06)' },
                    { label: 'CO₂ Saved', value: '12.4 kg', icon: Leaf, color: '#2E8B57', bg: 'rgba(46,139,87,0.06)' },
                    { label: 'Total Rides', value: '18', icon: Clock, color: '#6B7280', bg: 'rgba(107,114,128,0.06)' },
                ].map((s, i) => (
                    <div key={i} className="uni-card flex flex-col items-center gap-1.5 text-center py-3 px-2">
                        <s.icon size={18} color={s.color} />
                        <p className="text-base font-black" style={{ color: s.color }}>{s.value}</p>
                        <p className="text-[10px]" style={{ color: '#6B7280' }}>{s.label}</p>
                    </div>
                ))}
            </div>

            {/* Subscription */}
            <div className="uni-card space-y-2">
                <p className="text-xs font-bold uppercase tracking-wider" style={{ color: '#6B7280' }}>Subscription Plan</p>
                <p className="text-sm" style={{ color: '#6B7280' }}>No active plan</p>
                <button className="btn-primary w-full py-2.5 text-sm">View Plans</button>
            </div>

            {/* Rewards summary */}
            <div className="uni-card space-y-3">
                <p className="text-xs font-bold uppercase tracking-wider" style={{ color: '#6B7280' }}>Rewards Summary</p>
                <div className="flex justify-between text-sm">
                    <span style={{ color: '#6B7280' }}>Campus Coins Balance</span>
                    <span className="font-bold" style={{ color: '#1F3A5F' }}>150</span>
                </div>
                <div className="flex justify-between text-sm">
                    <span style={{ color: '#6B7280' }}>CO₂ Emission Reduced</span>
                    <span className="font-bold" style={{ color: '#2E8B57' }}>12.4 kg</span>
                </div>
                <div className="flex justify-between text-sm">
                    <span style={{ color: '#6B7280' }}>Shared Distance</span>
                    <span className="font-bold" style={{ color: '#1F3A5F' }}>284 km</span>
                </div>
            </div>

            {/* Ride History */}
            <div>
                <h2 className="text-sm font-bold mb-3" style={{ color: '#1F3A5F' }}>Previous Rides</h2>
                <div className="space-y-2">
                    {RIDES_HISTORY.map((r, i) => (
                        <div key={i} className="uni-card flex items-center justify-between py-3">
                            <div>
                                <p className="text-sm font-medium">{r.from} → {r.to}</p>
                                <p className="text-xs mt-0.5" style={{ color: '#6B7280' }}>{r.date}</p>
                            </div>
                            <div className="text-right">
                                <p className="font-bold text-sm" style={{ color: '#1F3A5F' }}>₹{r.fare}</p>
                                <p className="text-[10px] font-semibold" style={{ color: r.status === 'Completed' ? '#2E8B57' : '#E63946' }}>
                                    {r.status}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Logout */}
            <button className="w-full py-3 rounded-xl text-sm font-semibold border"
                style={{ color: '#E63946', borderColor: 'rgba(230,57,70,0.2)', background: 'rgba(230,57,70,0.04)' }}>
                Sign Out
            </button>
        </div>
    );
}
