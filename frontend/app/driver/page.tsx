"use client";
import React, { useState } from 'react';
import { Power, IndianRupee, MapPin, Check, X, Car, Bike } from 'lucide-react';

const REQUESTS = [
    { id: 1, pickup: 'Central Library', drop: 'East Hostel', rideType: '4-Wheeler' as const, passengers: 2, fare: 42 },
    { id: 2, pickup: 'Uni Main Gate', drop: 'Metro Station', rideType: '2-Wheeler' as const, passengers: 1, fare: 28 },
];

export default function DriverRequestsPage() {
    const [online, setOnline] = useState(false);
    const [pending, setPending] = useState(REQUESTS);
    const [active, setActive] = useState<typeof REQUESTS>([]);

    const accept = (r: typeof REQUESTS[0]) => {
        setPending(p => p.filter(x => x.id !== r.id));
        setActive(a => [...a, r]);
    };
    const decline = (id: number) => setPending(p => p.filter(x => x.id !== id));

    return (
        <div className="space-y-5">
            {/* Header + Toggle */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-xl font-bold" style={{ color: '#1F3A5F' }}>Ride Requests</h1>
                    <p className="text-xs mt-0.5" style={{ color: online ? '#2E8B57' : '#6B7280' }}>
                        {online ? 'Accepting rides' : 'You are offline'}
                    </p>
                </div>
                <button onClick={() => setOnline(!online)}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm border transition-all"
                    style={{
                        background: online ? 'rgba(230,57,70,0.06)' : 'rgba(46,139,87,0.08)',
                        color: online ? '#E63946' : '#2E8B57',
                        borderColor: online ? 'rgba(230,57,70,0.2)' : 'rgba(46,139,87,0.2)',
                    }}>
                    <Power size={14} /> {online ? 'Go Offline' : 'Go Online'}
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3">
                {[
                    { label: 'Weekly Income', value: '₹2,450', icon: IndianRupee, color: '#2E8B57', bg: 'rgba(46,139,87,0.06)' },
                    { label: 'Rides This Week', value: '14', icon: MapPin, color: '#1F3A5F', bg: 'rgba(31,58,95,0.05)' },
                ].map((s, i) => (
                    <div key={i} className="uni-card flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: s.bg }}>
                            <s.icon size={16} color={s.color} />
                        </div>
                        <div>
                            <p className="text-xs" style={{ color: '#6B7280' }}>{s.label}</p>
                            <p className="text-lg font-bold" style={{ color: '#1F3A5F' }}>{s.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Requests */}
            <div>
                <h2 className="text-sm font-bold mb-3" style={{ color: '#1F3A5F' }}>
                    Incoming Requests
                </h2>

                {!online ? (
                    <div className="uni-card text-center py-10">
                        <Power size={24} className="mx-auto mb-2" style={{ color: 'rgba(31,58,95,0.15)' }} />
                        <p className="text-sm" style={{ color: '#6B7280' }}>Go online to see ride requests</p>
                    </div>
                ) : pending.length === 0 && active.length === 0 ? (
                    <div className="uni-card text-center py-10">
                        <p className="text-sm" style={{ color: '#6B7280' }}>No pending requests right now</p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {pending.map(r => (
                            <div key={r.id} className="uni-card space-y-3">
                                <div className="flex items-start justify-between">
                                    <div className="space-y-0.5">
                                        <p className="text-sm font-semibold">{r.pickup}</p>
                                        <p className="text-xs" style={{ color: '#6B7280' }}>→ {r.drop}</p>
                                        <div className="flex items-center gap-3 mt-1.5 text-xs" style={{ color: '#6B7280' }}>
                                            <span className="flex items-center gap-1">
                                                {r.rideType === '2-Wheeler' ? <Bike size={11} /> : <Car size={11} />}
                                                {r.rideType}
                                            </span>
                                            <span>{r.passengers} passenger{r.passengers > 1 ? 's' : ''}</span>
                                        </div>
                                    </div>
                                    <p className="text-xl font-black" style={{ color: '#2E8B57' }}>₹{r.fare}</p>
                                </div>
                                <div className="flex gap-2">
                                    <button onClick={() => accept(r)}
                                        className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all"
                                        style={{ background: '#1F3A5F' }}>
                                        <Check size={14} /> Accept Ride
                                    </button>
                                    <button onClick={() => decline(r.id)}
                                        className="w-12 flex items-center justify-center rounded-xl border"
                                        style={{ background: 'white', borderColor: 'rgba(31,58,95,0.12)' }}>
                                        <X size={14} color="#6B7280" />
                                    </button>
                                </div>
                            </div>
                        ))}
                        {active.map(r => (
                            <div key={`a-${r.id}`} className="uni-card border-l-4 space-y-1"
                                style={{ borderLeftColor: '#2E8B57' }}>
                                <p className="text-[10px] font-bold uppercase tracking-wider" style={{ color: '#2E8B57' }}>
                                    Active Ride
                                </p>
                                <p className="text-sm font-semibold">{r.pickup} → {r.drop}</p>
                                <p className="text-xs" style={{ color: '#6B7280' }}>₹{r.fare} · {r.passengers} passenger{r.passengers > 1 ? 's' : ''}</p>
                                <button className="mt-1.5 w-full py-2 rounded-lg text-xs font-semibold"
                                    style={{ background: 'rgba(46,139,87,0.08)', color: '#2E8B57', border: '1px solid rgba(46,139,87,0.2)' }}>
                                    Navigate →
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
