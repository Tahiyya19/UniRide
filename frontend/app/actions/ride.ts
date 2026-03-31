"use server";

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

const MOCK_RIDER_ID = 'dummy-rider-id';

async function ensureRiderExists(riderId: string) {
    const rider = await prisma.user.findUnique({ where: { id: riderId } });
    if (!rider) {
        await prisma.user.create({
            data: {
                id: riderId,
                name: 'Campus Rider',
                email: `${riderId}@university.edu`,
                role: 'RIDER',
                campusCoins: 0,
                co2Saved: 0,
            },
        });
    }
}

export async function requestRide(riderId: string, pickup: string, drop: string, rideType: string) {
    await ensureRiderExists(riderId || MOCK_RIDER_ID);

    const ride = await prisma.ride.create({
        data: {
            riderId: riderId || MOCK_RIDER_ID,
            pickup,
            drop,
            distance: 5.0, // Stub
            fare: rideType === '2-Wheeler' ? 18 : 35,
            status: 'PENDING'
        }
    });
    revalidatePath('/rider');
    return ride;
}

export async function pollActiveDrivers() {
    // Stub for polling nearby verified drivers
    const drivers = await prisma.user.findMany({
        where: {
            role: 'DRIVER',
            isVerified: true
        },
        take: 3
    });
    
    return drivers.map(d => ({
        id: d.id,
        name: d.name,
        eta: Math.floor(Math.random() * 5) + 2 // Fake ETA for now
    }));
}

export async function getRideHistory(userId: string) {
    const effectiveRiderId = userId || MOCK_RIDER_ID;
    await ensureRiderExists(effectiveRiderId);

    return await prisma.ride.findMany({
        where: {
            riderId: effectiveRiderId
        },
        orderBy: {
            createdAt: 'desc'
        }
    });
}
