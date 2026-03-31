"use client";
import React from 'react';
import { Clock, MapPin } from 'lucide-react';

const RIDES = [
    { id: 1, from: 'University', to: 'East Hostel', date: 'Mar 8, 2026', time: '5:30 PM', fare: 35, status: 'Completed', driver: 'Priya S.' },
    { id: 2, from: 'Library', to: 'Canteen Block B', date: 'Mar 7, 2026', time: '12:15 PM', fare: 20, status: 'Completed', driver: 'Ravi M.' },
    { id: 3, from: 'Main Gate', to: 'Metro Station', date: 'Mar 5, 2026', time: '8:00 AM', fare: 55, status: 'Cancelled', driver: 'Kiran P.' },
];

export default function RidesPage() {
    return (
        <div className="space-y-5">
            <div>
                <h1 className="text-xl font-bold" style={{ color: 'var(--primary)' }}>My Rides</h1>
                <p className="text-xs mt-0.5" style={{ color: 'var(--secondary)' }}>Your complete ride history</p>
            </div>

            <div className="space-y-3">
                {RIDES.map(r => (
                    <div key={r.id} className="uni-card space-y-3">
                        <div className="flex items-start justify-between">
                            <div className="space-y-1 flex-1 min-w-0 mr-3">
                                <div className="flex items-center gap-2 text-xs" style={{ color: 'var(--secondary)' }}>
                                    <Clock size={11} />
                                    {r.date} · {r.time}
                                </div>
                                <p className="text-sm font-semibold">{r.from}</p>
                                <div className="flex items-start gap-1.5">
                                    <div className="mt-0.5 flex-shrink-0">
                                        <MapPin size={11} style={{ color: 'var(--accent)' }} />
                                    </div>
                                    <p className="text-sm" style={{ color: 'var(--secondary)' }}>{r.to}</p>
                                </div>
                            </div>
                            <div className="text-right flex-shrink-0">
                                <p className="font-bold text-base">₹{r.fare}</p>
                                <p className="text-[10px] font-bold uppercase tracking-wide mt-0.5"
                                    style={{ color: r.status === 'Completed' ? 'var(--accent)' : 'var(--safety)' }}>
                                    {r.status}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 pt-2 text-xs"
                            style={{ borderTop: '1px solid var(--card-border)', color: 'var(--secondary)' }}>
                            <div className="w-5 h-5 rounded-full flex items-center justify-center text-white text-[9px] font-bold"
                                style={{ background: 'var(--primary)' }}>
                                {r.driver[0]}
                            </div>
                            Driver: {r.driver}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
