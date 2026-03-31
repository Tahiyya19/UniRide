"use client";
import React, { useState } from 'react';
import { Users, Car, Activity, Leaf, IndianRupee, AlertTriangle, X } from 'lucide-react';

const METRICS = [
    { label: 'Drivers Online', value: '18', icon: Car, color: '#2E8B57', bg: 'rgba(46,139,87,0.08)' },
    { label: 'Active Riders', value: '34', icon: Users, color: '#1F3A5F', bg: 'rgba(31,58,95,0.06)' },
    { label: 'Ongoing Rides', value: '12', icon: Activity, color: '#6B7280', bg: 'rgba(107,114,128,0.06)' },
    { label: 'CO₂ Reduced', value: '2.4 kg', icon: Leaf, color: '#2E8B57', bg: 'rgba(46,139,87,0.08)' },
    { label: 'Commission Today', value: '₹1,240', icon: IndianRupee, color: '#1F3A5F', bg: 'rgba(31,58,95,0.06)' },
];

const LIVE_RIDES = [
    { id: 1, driver: 'Priya Sharma', driverUsn: '1RV20CS045', vehicle: 'Honda City · KA05 AB 1234', rider: 'Arjun Mehta', pickup: 'Central Library', drop: 'East Hostel' },
    { id: 2, driver: 'Ravi Mehta', driverUsn: '1RV21ME022', vehicle: 'Splendor · KA07 CD 5678', rider: 'Sneha Rao', pickup: 'Main Gate', drop: 'Metro Station' },
    { id: 3, driver: 'Kiran Patel', driverUsn: '1RV20IT099', vehicle: 'Honda Activa · KA04 EF 9012', rider: 'Vikram Singh', pickup: 'Canteen', drop: 'Sports Block' },
];

export default function AdminLivePage() {
    const [sosAlerts, setSosAlerts] = useState([
        { id: 1, rider: 'Meera Nair', location: 'Near Hostel Block C', time: '11:42 PM' },
    ]);

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold" style={{ color: '#1F3A5F' }}>Live Rides</h1>
                <p className="text-sm mt-0.5" style={{ color: '#6B7280' }}>Real-time ecosystem monitoring</p>
            </div>

            {/* SOS Alert Panel */}
            {sosAlerts.length > 0 && (
                <div className="rounded-xl border-2 p-4 space-y-3"
                    style={{ borderColor: '#E63946', background: 'rgba(230,57,70,0.04)' }}>
                    <div className="flex items-center gap-2">
                        <AlertTriangle size={16} color="#E63946" />
                        <p className="font-bold text-sm" style={{ color: '#E63946' }}>
                            SOS Alert{sosAlerts.length > 1 ? 's' : ''} ({sosAlerts.length})
                        </p>
                    </div>
                    {sosAlerts.map(alert => (
                        <div key={alert.id} className="flex items-start justify-between gap-3 p-3 rounded-xl"
                            style={{ background: 'rgba(230,57,70,0.06)', border: '1px solid rgba(230,57,70,0.15)' }}>
                            <div>
                                <p className="text-sm font-semibold" style={{ color: '#1F3A5F' }}>{alert.rider}</p>
                                <p className="text-xs mt-0.5" style={{ color: '#6B7280' }}>{alert.location} · {alert.time}</p>
                            </div>
                            <div className="flex gap-2 flex-shrink-0">
                                <button className="px-3 py-1.5 rounded-lg text-xs font-bold text-white"
                                    style={{ background: '#E63946' }}>
                                    Respond
                                </button>
                                <button onClick={() => setSosAlerts(a => a.filter(x => x.id !== alert.id))}
                                    className="w-8 h-8 flex items-center justify-center rounded-lg"
                                    style={{ background: 'rgba(230,57,70,0.1)' }}>
                                    <X size={14} color="#E63946" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Metrics grid */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                {METRICS.map((m, i) => (
                    <div key={i} className="uni-card flex flex-col items-center gap-2 text-center py-3">
                        <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: m.bg }}>
                            <m.icon size={17} color={m.color} />
                        </div>
                        <p className="text-base font-black" style={{ color: m.color }}>{m.value}</p>
                        <p className="text-[10px]" style={{ color: '#6B7280' }}>{m.label}</p>
                    </div>
                ))}
            </div>

            {/* Live ride cards */}
            <div>
                <h2 className="text-sm font-bold mb-3" style={{ color: '#1F3A5F' }}>Active Rides</h2>
                <div className="grid gap-3 md:grid-cols-2">
                    {LIVE_RIDES.map(ride => (
                        <div key={ride.id} className="uni-card space-y-3">
                            <div className="flex items-start justify-between">
                                <div>
                                    <p className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: '#2E8B57' }}>Driver</p>
                                    <p className="font-semibold text-sm">{ride.driver}</p>
                                    <p className="text-xs" style={{ color: '#6B7280' }}>{ride.driverUsn}</p>
                                    <p className="text-xs mt-0.5" style={{ color: '#6B7280' }}>{ride.vehicle}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: '#1F3A5F' }}>Rider</p>
                                    <p className="font-semibold text-sm">{ride.rider}</p>
                                </div>
                            </div>
                            <div className="p-2.5 rounded-xl text-xs space-y-1"
                                style={{ background: 'rgba(31,58,95,0.04)', border: '1px solid rgba(31,58,95,0.08)' }}>
                                <div className="flex items-center gap-2">
                                    <span style={{ color: '#6B7280' }}>From</span>
                                    <span className="font-medium">{ride.pickup}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span style={{ color: '#6B7280' }}>To</span>
                                    <span className="font-medium">{ride.drop}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
