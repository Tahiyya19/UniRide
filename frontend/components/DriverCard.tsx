"use client";
import React from 'react';
import { Star, Car, Bike, Clock } from 'lucide-react';

interface DriverCardProps {
    driver: {
        name: string;
        gender: string;
        rating: number;
        totalRides: number;
        vehicleType: '2-Wheeler' | '4-Wheeler';
        vehicleName: string;
        seatsAvailable: number;
        eta: number; // minutes
        photoInitials?: string;
    };
    confirmed?: boolean;
    onConfirm?: () => void;
}

export default function DriverCard({ driver, confirmed = false, onConfirm }: DriverCardProps) {
    return (
        <div className="uni-card confirm-appear">
            <div className="flex items-start gap-4">
                {/* Driver Avatar */}
                <div className="w-14 h-14 rounded-full flex items-center justify-center text-white text-lg font-bold flex-shrink-0 bg-primary">
                    {driver.photoInitials ?? driver.name.slice(0, 2).toUpperCase()}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                        <div>
                            <p className="font-bold text-base leading-tight">{driver.name}</p>
                            <p className="text-xs mt-0.5 text-secondary">{driver.gender}</p>
                        </div>
                        {/* ETA badge */}
                        <div className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold flex-shrink-0 bg-accent/10 text-accent">
                            <Clock size={11} />
                            {driver.eta} min
                        </div>
                    </div>

                    {/* Rating + Rides */}
                    <div className="flex items-center gap-3 mt-2">
                        <span className="flex items-center gap-1 text-xs font-semibold">
                            <Star size={12} fill="#2E8B57" stroke="none" className="text-accent" />
                            {driver.rating.toFixed(1)}
                        </span>
                        <span className="text-xs text-secondary">
                            {driver.totalRides} rides
                        </span>
                    </div>

                    {/* Vehicle */}
                    <div className="flex items-center gap-2 mt-3 px-3 py-2 rounded-lg bg-background border border-card-border">
                        {driver.vehicleType === '2-Wheeler'
                            ? <Bike size={14} className="text-primary" />
                            : <Car size={14} className="text-primary" />
                        }
                        <span className="text-xs font-medium">{driver.vehicleName}</span>
                        <span className="ml-auto text-xs text-secondary">
                            {driver.seatsAvailable} seat{driver.seatsAvailable !== 1 ? 's' : ''} free
                        </span>
                    </div>
                </div>
            </div>

            {/* Actions */}
            {!confirmed ? (
                <button
                    onClick={onConfirm}
                    className="btn-primary w-full mt-4"
                >
                    Confirm Ride
                </button>
            ) : (
                <div className="mt-4 p-3 rounded-xl text-center text-sm font-semibold bg-accent/10 text-accent border border-accent/20">
                    ✓ Ride Confirmed — contact details shared
                </div>
            )}
        </div>
    );
}
