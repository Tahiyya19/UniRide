"use client";
import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { MapPin, Navigation, Bike, Car, ArrowRight, AlertCircle, Users, Clock } from 'lucide-react';
import { requestRide, getRideHistory } from '@/app/actions/ride';

const MapComponent = dynamic(() => import('@/components/Map'), { ssr: false });

type Stage = 'booking' | 'searching' | 'matched' | 'confirmed';

type RideHistoryItem = {
    id: string;
    pickup: string;
    drop: string;
    fare: number;
    createdAt: Date;
};

type MatchedDriver = {
    name: string;
    gender: string;
    rating: number;
    totalRides: number;
    vehicleType: '2-Wheeler' | '4-Wheeler';
    vehicleName: string;
    seatsAvailable: number;
    eta: number;
};

export default function RiderBookPage() {
    const [pickup, setPickup] = useState('');
    const [drop, setDrop] = useState('');
    const [rideType, setRideType] = useState<'2-Wheeler' | '4-Wheeler'>('4-Wheeler');
    const [carpool, setCarpool] = useState(false);
    const [seats, setSeats] = useState(1);
    const [safetyMode, setSafetyMode] = useState(false);
    const [stage, setStage] = useState<Stage>('booking');
    const [dots, setDots] = useState('');
    const [history, setHistory] = useState<RideHistoryItem[]>([]);
    
    // Matched driver state
    const [driver, setDriver] = useState<MatchedDriver | null>(null);

    useEffect(() => {
        getRideHistory('dummy-rider-id').then(res => setHistory(res || []));
    }, []);

    const canRequest = pickup.trim() && drop.trim();

    const handleRequest = async () => {
        setStage('searching');
        let d = '';
        const interval = setInterval(() => { d = d.length >= 3 ? '' : d + '.'; setDots(d); }, 500);
        
        try {
            await requestRide('dummy-rider-id', pickup, drop, rideType);
            setTimeout(() => { 
                clearInterval(interval); 
                setDriver({
                    name: 'Ravi M.', gender: 'Male', rating: 4.8, totalRides: 42,
                    vehicleType: rideType, vehicleName: 'Honda Activa · KA01 XY 1234',
                    seatsAvailable: 1, eta: 3
                });
                setStage('matched'); 
            }, 3000);
        } catch {
            clearInterval(interval);
            setStage('booking');
        }
    };

    const baseFare = rideType === '2-Wheeler' ? 18 : 35;
    const estimatedFare = carpool ? Math.round(baseFare * 0.7) : baseFare;

    return (
        <div className="space-y-4">

            {/* === BOOKING === */}
            {stage === 'booking' && (
                <>
                    <div>
                        <h1 className="text-xl font-bold text-primary">Book a Ride</h1>
                        <p className="text-xs mt-0.5 text-secondary">Fast, safe campus commutes</p>
                    </div>

                    <div className="uni-card space-y-3">
                        {/* Pickup */}
                        <div className="flex items-center gap-3">
                            <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 bg-primary/10">
                                <Navigation size={13} className="text-primary" />
                            </div>
                            <input className="uni-input" placeholder="Pickup location" value={pickup} onChange={e => setPickup(e.target.value)} />
                        </div>

                        <div className="flex items-center gap-3 pl-3.5">
                            <div className="h-5 w-px rounded-full bg-primary/10" />
                        </div>

                        {/* Drop */}
                        <div className="flex items-center gap-3">
                            <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 bg-accent/10">
                                <MapPin size={13} className="text-accent" />
                            </div>
                            <input className="uni-input" placeholder="Drop location" value={drop} onChange={e => setDrop(e.target.value)} />
                        </div>

                        {/* Ride type */}
                        <div className="border-t pt-3 border-card-border">
                            <p className="text-xs font-semibold mb-2 text-secondary">Ride Type</p>
                            <div className="grid grid-cols-2 gap-2">
                                {(['2-Wheeler', '4-Wheeler'] as const).map(t => (
                                    <button key={t} onClick={() => { setRideType(t); if (t === '2-Wheeler') setCarpool(false); }}
                                        className={`flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all border-1.5 ${rideType === t ? 'bg-primary text-white border-primary' : 'bg-white text-secondary border-card-border'}`}>
                                        {t === '2-Wheeler' ? <Bike size={14} /> : <Car size={14} />} {t}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Carpool options (4W only) */}
                        {rideType === '4-Wheeler' && (
                            <div className="space-y-3 border-t pt-3 border-card-border">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Users size={14} className="text-primary" />
                                        <span className="text-sm font-medium">Enable Carpool</span>
                                    </div>
                                    <button onClick={() => setCarpool(!carpool)}
                                        className={`relative w-11 h-6 rounded-full transition-colors ${carpool ? 'bg-accent' : 'bg-primary/10'}`}>
                                        <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform ${carpool ? 'translate-x-5' : ''}`} />
                                    </button>
                                </div>
                                {carpool && (
                                    <div className="flex items-center gap-3">
                                        <p className="text-xs font-medium text-secondary">Seats requested</p>
                                        <div className="flex items-center gap-2 ml-auto">
                                            <button onClick={() => setSeats(Math.max(1, seats - 1))}
                                                className="w-8 h-8 rounded-full border flex items-center justify-center font-bold text-lg border-primary/20 text-primary">−</button>
                                            <span className="w-6 text-center font-bold">{seats}</span>
                                            <button onClick={() => setSeats(Math.min(3, seats + 1))}
                                                className="w-8 h-8 rounded-full border flex items-center justify-center font-bold text-lg border-primary/20 text-primary">+</button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Safety toggle - Updated to Buddy System preference */}
                        <div className="border-t pt-3 border-card-border">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Users size={14} className={safetyMode ? 'text-accent' : 'text-secondary'} />
                                    <span className="text-sm font-medium">Study Buddy Matching</span>
                                </div>
                                <button onClick={() => setSafetyMode(!safetyMode)}
                                        className={`relative w-11 h-6 rounded-full transition-colors ${safetyMode ? 'bg-accent' : 'bg-primary/10'}`}>
                                    <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform ${safetyMode ? 'translate-x-5' : ''}`} />
                                </button>
                            </div>
                            {safetyMode && (
                                <div className="mt-2 flex items-center gap-2 p-2 rounded-lg text-xs bg-accent/5 text-accent border border-accent/20">
                                    <AlertCircle size={11} /> Preference to match with users in similar courses
                                </div>
                            )}
                        </div>

                        {/* Estimated Price */}
                        <div className="flex items-center justify-between p-3 rounded-xl bg-primary/5 border border-primary/10">
                            <span className="text-xs font-medium text-secondary">Estimated Price</span>
                            <span className="text-lg font-bold text-primary">
                                ₹{estimatedFare} {carpool && <span className="text-xs font-normal text-green-600 ml-1">Carpool rate</span>}
                            </span>
                        </div>
                    </div>

                    {/* Map */}
                    <div className="rounded-2xl overflow-hidden h-56">
                        <MapComponent pickup={pickup} drop={drop} />
                    </div>

                    <button onClick={handleRequest} disabled={!canRequest}
                        className={`btn-primary w-full gap-2 text-base py-3.5 ${!canRequest ? 'opacity-40' : 'opacity-100'}`}>
                        Request Ride <ArrowRight size={17} />
                    </button>

                    {/* Previous Rides */}
                    <div>
                        <h2 className="text-sm font-bold mb-3 flex items-center gap-2 text-primary">
                            <Clock size={14} /> Previous Rides
                        </h2>
                        <div className="space-y-2">
                            {history.length === 0 ? (
                                <p className="text-sm text-secondary">No recent rides found.</p>
                            ) : (
                                history.map(r => (
                                    <div key={r.id} className="uni-card flex items-center justify-between py-3">
                                        <div>
                                            <p className="text-sm font-medium">{r.pickup} → {r.drop}</p>
                                            <p className="text-xs mt-0.5 text-secondary">{new Date(r.createdAt).toLocaleDateString()}</p>
                                        </div>
                                        <p className="font-bold text-primary">₹{r.fare}</p>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </>
            )}

            {/* === SEARCHING === */}
            {stage === 'searching' && (
                <div className="space-y-4 pt-4">
                    <div className="relative rounded-2xl overflow-hidden h-72">
                        <MapComponent pickup={pickup} drop={drop} />
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <div className="relative flex items-center justify-center w-12 h-12">
                                <div className="pulse-ring absolute inset-0 rounded-full bg-primary/20" />
                                <div className="pulse-ring absolute inset-0 rounded-full bg-primary/10" style={{ animationDelay: '0.7s'}} />
                                <div className="w-12 h-12 rounded-full flex items-center justify-center relative z-10 text-white text-xs font-bold bg-primary">
                                    YOU
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="uni-card text-center space-y-2">
                        <p className="font-bold">Searching for drivers{dots}</p>
                        <p className="text-xs text-secondary">
                            {safetyMode ? 'Preference matching active' : 'Notifying nearby drivers'}
                        </p>
                    </div>
                    <button onClick={() => setStage('booking')}
                        className="w-full py-3 rounded-xl text-sm font-semibold border-1.5 border-card-border text-secondary bg-white">
                        Cancel
                    </button>
                </div>
            )}

            {/* === MATCHED === */}
            {stage === 'matched' && driver && (
                <div className="space-y-4 confirm-appear pt-2">
                    <h2 className="text-lg font-bold text-primary">Driver Found!</h2>
                    <div className="uni-card space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-lg bg-primary">
                                {driver.name.slice(0, 2).toUpperCase()}
                            </div>
                            <div className="flex-1">
                                <p className="font-bold">{driver.name}</p>
                                <p className="text-xs text-secondary">{driver.gender} · ⭐ {driver.rating} · {driver.totalRides} rides</p>
                                <p className="text-xs mt-1 text-secondary">{driver.vehicleName}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-xs font-semibold px-2 py-1 rounded-full bg-accent/10 text-accent">
                                    {driver.eta} min ETA
                                </p>
                                <p className="text-xs mt-1.5 text-secondary">{driver.seatsAvailable} seats free</p>
                            </div>
                        </div>
                        <button onClick={() => setStage('confirmed')} className="btn-primary w-full py-3">
                            Confirm Ride
                        </button>
                    </div>
                    <button onClick={() => setStage('booking')}
                        className="w-full py-3 rounded-xl text-sm text-secondary">Back</button>
                </div>
            )}

            {/* === CONFIRMED === */}
            {stage === 'confirmed' && driver && (
                <div className="space-y-4 confirm-appear">
                    <div className="uni-card text-center py-4 space-y-1 border-accent/30 bg-accent/5">
                        <p className="font-bold text-base text-accent">✓ Ride Confirmed</p>
                        <p className="text-xs text-secondary">{driver.name} is on their way · {driver.eta} min</p>
                    </div>
                    <div className="rounded-2xl overflow-hidden h-56">
                        <MapComponent pickup={pickup} drop={drop} />
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                        <button className="py-3 rounded-xl text-xs font-bold border transition-all bg-primary/5 text-primary border-primary/10">🔗 Share</button>
                        <button className="py-3 rounded-xl text-xs font-bold border transition-all bg-primary/5 text-primary border-primary/10">📞 Driver</button>
                        <button className="py-3 rounded-xl text-xs font-bold border transition-all bg-safety text-white border-primary/10">🆘 SOS</button>
                    </div>
                    <button onClick={() => { setStage('booking'); setPickup(''); setDrop(''); }}
                        className="w-full text-xs py-2 text-secondary">
                        End Ride
                    </button>
                </div>
            )}
        </div>
    );
}
