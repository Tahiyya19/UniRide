"use client";
import React, { useState, useEffect } from 'react';
import GlassCard from '@/components/GlassCard';
import { MapPin, Navigation, Car, Bike, Info, ArrowRight, CheckCircle2, AlertTriangle, Leaf } from 'lucide-react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { bookRide } from '@/lib/actions/rider';

const Map = dynamic(() => import('@/components/Map'), { ssr: false, loading: () => <div className="h-[400px] w-full animate-pulse bg-white/5 rounded-xl border border-white/10" /> });

const UNIVERSITY_LOCATION = "University Campus";

type BookedRide = {
    id: string;
    pickup: string;
    drop: string;
    fare: number;
    rideType: string;
    driver: string;
    time: string;
};

const BookRidePage = () => {
    const [pickup, setPickup] = useState(UNIVERSITY_LOCATION);
    const [drop, setDrop] = useState("");
    const [rideType, setRideType] = useState('2-wheeler');
    const distance = 5; // Mock distance in km
    const [fare, setFare] = useState(0);
    const [isBooking, setIsBooking] = useState(false);
    const [bookedRide, setBookedRide] = useState<BookedRide | null>(null);
    const [error, setError] = useState("");

    // Simple pricing calculation (matches backend logic)
    useEffect(() => {
        const base = 20;
        const rate = rideType === '4-wheeler' ? 15 : 8;
        const surge = 1.2; // Simulated surge
        const estimatedFare = base + (distance * rate) * surge;
        setFare(Math.round(estimatedFare));
    }, [rideType, distance]);

    const handleBook = async () => {
        setError("");

        // Validation: One must be university
        if (pickup !== UNIVERSITY_LOCATION && drop !== UNIVERSITY_LOCATION) {
            setError("University-Only Rule: Pickup or Drop must be the University.");
            return;
        }

        if (!drop) {
            setError("Please enter a destination.");
            return;
        }

        setIsBooking(true);
        try {
            const ride = await bookRide(pickup, drop, fare, rideType);
            setBookedRide({
                id: ride.id.split('-')[0].toUpperCase(), // Just a short hash for UI
                pickup,
                drop,
                fare,
                rideType,
                driver: "Waiting for Driver...",
                time: "Searching..."
            });
        } catch (err) {
            setError("Failed to book ride. Please try again.");
            console.error(err);
        } finally {
            setIsBooking(false);
        }
    };

    if (bookedRide) {
        return (
            <div className="max-w-md mx-auto py-12 animate-in zoom-in-95 duration-500">
                <GlassCard className="text-center border-green-500/20 bg-green-500/5">
                    <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    <h1 className="text-2xl font-bold">Ride Booked!</h1>
                    <p className="text-gray-400 mt-2">Your driver is on the way.</p>

                    <div className="mt-8 space-y-4 text-left">
                        <div className="flex justify-between border-b border-white/5 pb-2">
                            <span className="text-gray-400 text-sm">Ride ID</span>
                            <span className="font-mono font-bold text-accent">{bookedRide.id}</span>
                        </div>
                        <div className="flex justify-between border-b border-white/5 pb-2">
                            <span className="text-gray-400 text-sm">Driver</span>
                            <span className="font-bold">{bookedRide.driver}</span>
                        </div>
                        <div className="flex justify-between border-b border-white/5 pb-2">
                            <span className="text-gray-400 text-sm">Fare</span>
                            <span className="font-bold text-primary">₹{bookedRide.fare}</span>
                        </div>
                    </div>

                    <div className="mt-8 flex gap-4">
                        <Link href="/rider" className="btn-primary flex-1">Back home</Link>
                        <button className="flex-1 border border-white/10 rounded-xl hover:bg-white/5 transition-colors">Track Ride</button>
                    </div>
                </GlassCard>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto py-8">
            <h1 className="text-3xl font-bold mb-8">Book a Ride</h1>

            {/* Map Section */}
            <div className="mb-8">
                <Map pickup={pickup} drop={drop} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Booking Form */}
                <div className="space-y-6">
                    <GlassCard title="Ride Details">
                        <div className="space-y-4">
                            <div>
                                <label className="text-xs text-gray-400 block mb-1 uppercase tracking-wider">Pickup</label>
                                <div className="relative">
                                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary" />
                                    <input
                                        type="text"
                                        value={pickup}
                                        onChange={(e) => setPickup(e.target.value)}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:border-primary transition-colors"
                                    />
                                </div>
                            </div>

                            <div className="flex justify-center -my-2 opacity-30">
                                <ArrowRight className="rotate-90 w-4 h-4" />
                            </div>

                            <div>
                                <label className="text-xs text-gray-400 block mb-1 uppercase tracking-wider">Destination</label>
                                <div className="relative">
                                    <Navigation className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-accent" />
                                    <input
                                        type="text"
                                        placeholder="Where to?"
                                        value={drop}
                                        onChange={(e) => setDrop(e.target.value)}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:border-primary transition-colors"
                                    />
                                </div>
                            </div>
                        </div>
                    </GlassCard>

                    <GlassCard title="Vehicle Type">
                        <div className="grid grid-cols-2 gap-4">
                            <button
                                onClick={() => setRideType('2-wheeler')}
                                className={`p-4 rounded-xl border flex flex-col items-center gap-2 transition-all ${rideType === '2-wheeler' ? 'border-primary bg-primary/10' : 'border-white/10 hover:border-white/20'}`}
                            >
                                <Bike className={`w-8 h-8 ${rideType === '2-wheeler' ? 'text-primary' : 'text-gray-400'}`} />
                                <span className={`text-sm font-bold ${rideType === '2-wheeler' ? 'text-primary' : 'text-gray-400'}`}>2-Wheeler</span>
                                <span className="text-[10px] text-gray-500 uppercase">1 Passenger</span>
                            </button>
                            <button
                                onClick={() => setRideType('4-wheeler')}
                                className={`p-4 rounded-xl border flex flex-col items-center gap-2 transition-all ${rideType === '4-wheeler' ? 'border-primary bg-primary/10' : 'border-white/10 hover:border-white/20'}`}
                            >
                                <Car className={`w-8 h-8 ${rideType === '4-wheeler' ? 'text-primary' : 'text-gray-400'}`} />
                                <span className={`text-sm font-bold ${rideType === '4-wheeler' ? 'text-primary' : 'text-gray-400'}`}>4-Wheeler</span>
                                <span className="text-[10px] text-gray-500 uppercase">Up to 4</span>
                            </button>
                        </div>
                    </GlassCard>
                </div>

                {/* Estimate & Confirm */}
                <div className="space-y-6">
                    <GlassCard title="Fare Estimate" className="border-primary/20 bg-primary/5">
                        <div className="flex justify-between items-end">
                            <div>
                                <p className="text-4xl font-black text-primary">₹{fare}</p>
                                <p className="text-xs text-gray-400 mt-1">Estimated for ~5.0 km</p>
                            </div>
                            <div className="bg-accent/10 border border-accent/20 px-2 py-1 rounded text-[10px] font-bold text-accent animate-pulse">
                                SURGE 1.2x
                            </div>
                        </div>

                        <div className="mt-6 flex items-start gap-2 p-3 bg-white/5 rounded-lg border border-white/5">
                            <Info className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" />
                            <p className="text-[10px] text-gray-400">
                                Pricing is dynamic based on demand and traffic.
                                Includes 5% university maintenance fee.
                            </p>
                        </div>

                        {error && (
                            <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-2 text-xs text-red-500">
                                <AlertTriangle className="w-4 h-4 shrink-0" />
                                {error}
                            </div>
                        )}

                        <button
                            onClick={handleBook}
                            disabled={isBooking}
                            className="btn-primary w-full mt-6 shadow-xl shadow-primary/30 py-4 text-lg"
                        >
                            {isBooking ? (
                                <span className="flex items-center gap-2">
                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    Finding Drivers...
                                </span>
                            ) : "Confirm Booking"}
                        </button>
                    </GlassCard>

                    <GlassCard className="opacity-50 pointer-events-none">
                        <div className="flex items-center gap-3">
                            <div className="p-2 rounded bg-green-500/20">
                                <Leaf className="w-4 h-4 text-green-500" />
                            </div>
                            <div>
                                <p className="text-xs font-bold">Reward Potential</p>
                                <p className="text-[10px] text-gray-400">Carpooling on this route earns ~15 coins</p>
                            </div>
                        </div>
                    </GlassCard>
                </div>
            </div>
        </div>
    );
};

export default BookRidePage;
