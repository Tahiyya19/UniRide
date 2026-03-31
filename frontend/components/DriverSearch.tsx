"use client";
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { pollActiveDrivers } from '@/app/actions/ride';

const MapComponent = dynamic(() => import('./Map'), { ssr: false });

interface DriverSearchProps {
    pickup: string;
    drop: string;
    safetyMode: boolean;
    onCancel: () => void;
}

type ActiveDriver = {
    id: string;
    name: string;
    eta: number;
};

export default function DriverSearch({ pickup, drop, safetyMode, onCancel }: DriverSearchProps) {
    const [dots, setDots] = useState('');
    const [drivers, setDrivers] = useState<ActiveDriver[]>([]);

    useEffect(() => {
        const fetchDrivers = async () => {
             const active = await pollActiveDrivers();
             setDrivers(active);
        };
        fetchDrivers();
        const interval = setInterval(() => {
            setDots(d => (d.length >= 3 ? '' : d + '.'));
        }, 500);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex flex-col gap-4">
            {/* Map with pulse overlay */}
            <div className="relative rounded-2xl overflow-hidden h-[320px]">
                <MapComponent pickup={pickup} drop={drop} />

                {/* Pulse rings centered on map */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="relative flex items-center justify-center w-12 h-12">
                        <div className="pulse-ring absolute inset-0 rounded-full bg-primary/15" />
                        <div className="pulse-ring absolute inset-0 rounded-full bg-primary/10" style={{ animationDelay: '0.5s' }} />
                        <div className="w-12 h-12 rounded-full flex items-center justify-center relative z-10 bg-primary">
                            <span className="text-white text-xs font-bold">YOU</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Status */}
            <div className="uni-card text-center space-y-2">
                <p className="font-bold text-base">Searching for drivers{dots}</p>
                <p className="text-xs text-secondary">
                    {safetyMode ? 'Preference matching is active' : 'Nearby drivers notified'}
                </p>
                <div className="flex gap-2 pt-1 justify-center">
                    {drivers.map(d => (
                        <div key={d.id} className="px-3 py-1.5 rounded-full text-xs font-semibold bg-accent/10 text-accent border border-accent/20">
                            {d.name.split(' ')[0]} · {d.eta} min away
                        </div>
                    ))}
                </div>
            </div>

            <button onClick={onCancel}
                className="w-full py-3 rounded-xl text-sm font-semibold transition-all bg-background border-1.5 border-card-border text-secondary">
                Cancel Search
            </button>
        </div>
    );
}
