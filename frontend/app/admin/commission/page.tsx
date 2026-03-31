"use client";
import React, { useState } from 'react';
import { Bell, Flag } from 'lucide-react';

const COMMISSION_DATA = [
    { id: 1, name: 'Ravi Mehta', usn: '1RV21ME022', pending: 320, rides: 28, flagged: false },
    { id: 2, name: 'Suresh Kumar', usn: '1RV20IS055', pending: 185, rides: 17, flagged: false },
    { id: 3, name: 'Deepak Nair', usn: '1RV21IT030', pending: 510, rides: 41, flagged: false },
    { id: 4, name: 'Ananya Sinha', usn: '1RV22CS201', pending: 95, rides: 9, flagged: false },
];

export default function AdminCommissionPage() {
    const [data, setData] = useState(COMMISSION_DATA);
    const [reminded, setReminded] = useState<number[]>([]);

    const sendReminder = (id: number) => setReminded(r => [...r, id]);
    const flagAccount = (id: number) =>
        setData(d => d.map(x => x.id === id ? { ...x, flagged: !x.flagged } : x));

    return (
        <div className="space-y-5">
            <div>
                <h1 className="text-2xl font-bold" style={{ color: '#1F3A5F' }}>Commission Notices</h1>
                <p className="text-sm mt-0.5" style={{ color: '#6B7280' }}>
                    Drivers with unpaid platform commission
                </p>
            </div>

            {/* Summary */}
            <div className="uni-card flex items-center justify-between">
                <div>
                    <p className="text-xs" style={{ color: '#6B7280' }}>Total Pending</p>
                    <p className="text-2xl font-black" style={{ color: '#E63946' }}>
                        ₹{data.reduce((s, d) => s + d.pending, 0).toLocaleString()}
                    </p>
                </div>
                <div className="text-right">
                    <p className="text-xs" style={{ color: '#6B7280' }}>Drivers Owing</p>
                    <p className="text-2xl font-black" style={{ color: '#1F3A5F' }}>{data.length}</p>
                </div>
            </div>

            {/* Drivers */}
            <div className="space-y-3">
                {data.map(driver => (
                    <div key={driver.id} className="uni-card space-y-3"
                        style={driver.flagged ? { borderColor: '#E63946', borderWidth: 1.5 } : {}}>
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="font-bold">{driver.name}</p>
                                <p className="text-xs mt-0.5" style={{ color: '#6B7280' }}>{driver.usn}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-xl font-black" style={{ color: '#E63946' }}>
                                    ₹{driver.pending}
                                </p>
                                <p className="text-[10px]" style={{ color: '#6B7280' }}>{driver.rides} rides</p>
                            </div>
                        </div>

                        {driver.flagged && (
                            <div className="rounded-lg px-3 py-1.5 text-xs font-semibold"
                                style={{ background: 'rgba(230,57,70,0.08)', color: '#E63946' }}>
                                ⚑ Account Flagged
                            </div>
                        )}

                        <div className="flex gap-2">
                            <button
                                onClick={() => sendReminder(driver.id)}
                                disabled={reminded.includes(driver.id)}
                                className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-sm font-semibold border transition-all"
                                style={{
                                    background: reminded.includes(driver.id) ? 'rgba(107,114,128,0.06)' : 'rgba(31,58,95,0.06)',
                                    color: reminded.includes(driver.id) ? '#6B7280' : '#1F3A5F',
                                    borderColor: reminded.includes(driver.id) ? 'rgba(107,114,128,0.15)' : 'rgba(31,58,95,0.15)',
                                    opacity: reminded.includes(driver.id) ? 0.7 : 1,
                                }}>
                                <Bell size={13} />
                                {reminded.includes(driver.id) ? 'Reminder Sent' : 'Send Reminder'}
                            </button>
                            <button
                                onClick={() => flagAccount(driver.id)}
                                className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold border transition-all"
                                style={{
                                    background: driver.flagged ? 'rgba(230,57,70,0.08)' : 'white',
                                    color: '#E63946',
                                    borderColor: 'rgba(230,57,70,0.2)',
                                }}>
                                <Flag size={13} />
                                {driver.flagged ? 'Unflag' : 'Flag'}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
