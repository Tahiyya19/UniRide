"use client";
import React, { useState } from 'react';
import { User } from 'lucide-react';

interface Seat {
    id: number;
    occupied: boolean;
    rider?: { name: string; usn: string; gender: string };
}

interface SeatDiagramProps {
    seats: Seat[];
    driverName: string;
}

export default function SeatDiagram({ seats, driverName }: SeatDiagramProps) {
    const [selected, setSelected] = useState<number | null>(null);

    const occupiedSeat = selected !== null ? seats.find(s => s.id === selected) : null;

    return (
        <div className="uni-card space-y-4">
            <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--secondary)' }}>
                Seat Availability
            </p>

            {/* Driver */}
            <div className="flex items-center gap-3">
                <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-bold"
                    style={{ background: 'var(--primary)' }}
                >
                    D
                </div>
                <span className="text-sm font-semibold">{driverName}</span>
                <span className="text-xs px-2 py-0.5 rounded-full font-medium ml-auto"
                    style={{ background: 'rgba(31,58,95,0.08)', color: 'var(--primary)' }}>
                    Driver
                </span>
            </div>

            <div className="border-t" style={{ borderColor: 'var(--card-border)' }} />

            {/* Seats */}
            <div className="grid grid-cols-3 gap-3">
                {seats.map((seat) => (
                    <button
                        key={seat.id}
                        onClick={() => seat.occupied ? setSelected(selected === seat.id ? null : seat.id) : null}
                        className={`rounded-xl border-2 p-3 flex flex-col items-center gap-1.5 transition-all seat-appear
                            ${seat.occupied
                                ? 'cursor-pointer hover:scale-105'
                                : 'cursor-default opacity-60'
                            }
                            ${selected === seat.id ? 'ring-2' : ''}
                        `}
                        style={{
                            borderColor: seat.occupied ? 'var(--primary)' : 'var(--card-border)',
                            background: seat.occupied
                                ? 'rgba(31,58,95,0.06)'
                                : 'var(--background)',
                            outlineColor: 'var(--primary)',
                        }}
                    >
                        <div
                            className="w-8 h-8 rounded-full flex items-center justify-center"
                            style={{
                                background: seat.occupied ? 'rgba(31,58,95,0.12)' : 'transparent',
                                border: seat.occupied ? 'none' : '1.5px dashed var(--card-border)',
                            }}
                        >
                            {seat.occupied
                                ? <User size={15} style={{ color: 'var(--primary)' }} />
                                : <span className="text-[10px]" style={{ color: 'var(--card-border)' }}>+</span>
                            }
                        </div>
                        <span className="text-[10px] font-semibold"
                            style={{ color: seat.occupied ? 'var(--foreground)' : 'var(--secondary)' }}>
                            {seat.occupied ? `Seat ${seat.id}` : 'Open'}
                        </span>
                    </button>
                ))}
            </div>

            {/* Tooltip / Detail */}
            {occupiedSeat?.rider && (
                <div className="rounded-xl p-3 confirm-appear space-y-1"
                    style={{ background: 'rgba(31,58,95,0.06)', border: '1px solid var(--card-border)' }}>
                    <p className="text-sm font-bold">{occupiedSeat.rider.name}</p>
                    <p className="text-xs" style={{ color: 'var(--secondary)' }}>
                        USN: {occupiedSeat.rider.usn} · {occupiedSeat.rider.gender}
                    </p>
                </div>
            )}
        </div>
    );
}
