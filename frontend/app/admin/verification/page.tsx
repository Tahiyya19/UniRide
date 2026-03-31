"use client";
import React, { useState, useEffect } from 'react';
import { Check, X, FileText } from 'lucide-react';
import { getPendingDrivers, approveDriver, rejectDriver } from '@/app/actions/driver';

type PendingDriver = Awaited<ReturnType<typeof getPendingDrivers>>[number];

export default function AdminVerificationPage() {
    const [pending, setPending] = useState<PendingDriver[]>([]);
    const [approvedCount, setApprovedCount] = useState(0);
    const [rejectedCount, setRejectedCount] = useState(0);

    useEffect(() => {
        getPendingDrivers().then(setPending);
    }, []);

    const approve = async (id: string) => {
        await approveDriver(id);
        setApprovedCount(a => a + 1);
        setPending(p => p.filter(d => d.id !== id));
    };
    
    const reject = async (id: string) => {
        await rejectDriver(id);
        setRejectedCount(r => r + 1);
        setPending(p => p.filter(d => d.id !== id));
    };

    return (
        <div className="space-y-5">
            <div>
                <h1 className="text-2xl font-bold text-primary">Driver Verifications</h1>
                <p className="text-sm mt-0.5 text-secondary">
                    {pending.length} pending · {approvedCount} approved · {rejectedCount} rejected
                </p>
            </div>

            {pending.length === 0 ? (
                <div className="uni-card text-center py-14">
                    <Check size={28} className="mx-auto mb-2 text-accent/30" />
                    <p className="text-secondary">All applications reviewed</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {pending.map(driver => (
                        <div key={driver.id} className="uni-card space-y-4">
                            <div className="flex items-start justify-between gap-3">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0 bg-primary">
                                        {driver.name.split(' ').map((n: string) => n[0]).join('')}
                                    </div>
                                    <div>
                                        <p className="font-bold">{driver.name}</p>
                                        <p className="text-xs text-secondary">{driver.email}</p>
                                    </div>
                                </div>
                                <span className="text-[10px] font-bold uppercase px-2 py-1 rounded-full flex-shrink-0 bg-safety/10 text-safety border border-safety/15">
                                    Pending
                                </span>
                            </div>

                            {/* Vehicle info */}
                            {driver.vehicle ? (
                                <div className="p-3 rounded-xl space-y-1 bg-primary/5 border border-primary/10">
                                    <div className="flex justify-between text-xs">
                                        <span className="text-secondary">Vehicle Type</span>
                                        <span className="font-semibold">{driver.vehicle.type}</span>
                                    </div>
                                    <div className="flex justify-between text-xs">
                                        <span className="text-secondary">Vehicle Number</span>
                                        <span className="font-semibold font-mono">{driver.vehicle.plate}</span>
                                    </div>
                                </div>
                            ) : null}

                            {/* License placeholder */}
                            <div className="flex items-center gap-2 p-3 rounded-xl border border-dashed border-primary/20 bg-primary/5">
                                <FileText size={16} className="text-secondary" />
                                <span className="text-xs text-secondary">License Document — tap to view</span>
                            </div>

                            {/* Actions */}
                            <div className="flex gap-2">
                                <button onClick={() => approve(driver.id)}
                                    className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-sm font-semibold text-white bg-accent">
                                    <Check size={14} /> Approve
                                </button>
                                <button onClick={() => reject(driver.id)}
                                    className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-sm font-semibold bg-safety/10 text-safety border border-safety/15">
                                    <X size={14} /> Reject
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
