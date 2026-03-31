"use client";
import React from 'react';
import { Car, BookOpen, Phone, Star, Award, Clock } from 'lucide-react';

const DRIVER = { name: 'Kiran Patel', usn: '1RV20ME067', vehicleType: '4-Wheeler', vehicleNo: 'KA05 AB 1234', phone: '+91 99001 23456' };
const HISTORY = [
    { from: 'Library', to: 'East Hostel', date: 'Mar 8', fare: 42 },
    { from: 'Main Gate', to: 'Metro Stn', date: 'Mar 7', fare: 28 },
    { from: 'Canteen', to: 'Sports Block', date: 'Mar 5', fare: 35 },
];

export default function DriverProfilePage() {
    return (
        <div className="space-y-5">
            <div>
                <h1 className="text-xl font-bold" style={{ color: '#1F3A5F' }}>Driver Profile</h1>
            </div>

            {/* User card */}
            <div className="uni-card flex items-center gap-4">
                <div className="w-14 h-14 rounded-full flex items-center justify-center text-white text-xl font-bold"
                    style={{ background: '#1F3A5F' }}>
                    {DRIVER.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="space-y-1">
                    <p className="font-bold text-base">{DRIVER.name}</p>
                    <div className="flex items-center gap-2 text-xs" style={{ color: '#6B7280' }}>
                        <BookOpen size={11} /> {DRIVER.usn}
                    </div>
                    <div className="flex items-center gap-2 text-xs" style={{ color: '#6B7280' }}>
                        <Phone size={11} /> {DRIVER.phone}
                    </div>
                </div>
            </div>

            {/* Vehicle info */}
            <div className="uni-card space-y-2">
                <p className="text-xs font-bold uppercase tracking-wider" style={{ color: '#6B7280' }}>Vehicle Details</p>
                <div className="flex items-center gap-3 mt-2">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                        style={{ background: 'rgba(46,139,87,0.08)' }}>
                        <Car size={18} color="#2E8B57" />
                    </div>
                    <div>
                        <p className="font-semibold text-sm">{DRIVER.vehicleType}</p>
                        <p className="text-xs font-mono" style={{ color: '#6B7280' }}>{DRIVER.vehicleNo}</p>
                    </div>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3">
                {[
                    { label: 'Coins', value: '680', icon: Award, color: '#1F3A5F' },
                    { label: 'Rating', value: '4.8 ★', icon: Star, color: '#2E8B57' },
                    { label: 'Total Rides', value: '127', icon: Clock, color: '#6B7280' },
                ].map((s, i) => (
                    <div key={i} className="uni-card flex flex-col items-center gap-1.5 text-center py-3">
                        <s.icon size={16} color={s.color} />
                        <p className="text-base font-black" style={{ color: s.color }}>{s.value}</p>
                        <p className="text-[10px]" style={{ color: '#6B7280' }}>{s.label}</p>
                    </div>
                ))}
            </div>

            {/* Ride history */}
            <div>
                <h2 className="text-sm font-bold mb-3" style={{ color: '#1F3A5F' }}>Ride History</h2>
                <div className="space-y-2">
                    {HISTORY.map((r, i) => (
                        <div key={i} className="uni-card flex items-center justify-between py-3">
                            <div>
                                <p className="text-sm font-medium">{r.from} → {r.to}</p>
                                <p className="text-xs mt-0.5" style={{ color: '#6B7280' }}>{r.date}</p>
                            </div>
                            <p className="font-bold text-sm" style={{ color: '#2E8B57' }}>₹{r.fare}</p>
                        </div>
                    ))}
                </div>
            </div>

            <button className="w-full py-3 rounded-xl text-sm font-semibold border"
                style={{ color: '#E63946', borderColor: 'rgba(230,57,70,0.2)', background: 'rgba(230,57,70,0.04)' }}>
                Sign Out
            </button>
        </div>
    );
}
