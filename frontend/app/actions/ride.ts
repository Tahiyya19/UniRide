"use server";

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { getUserId } from '@/lib/auth';

export async function requestRide(pickup: string, drop: string, rideType: string) {
    const riderId = await getUserId();
    if (!riderId) throw new Error("Unauthorized");

    const ride = await prisma.ride.create({
        data: {
            riderId,
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

export async function getRideHistory() {
    const riderId = await getUserId();
    if (!riderId) return [];

    return await prisma.ride.findMany({
        where: {
            riderId
        },
        orderBy: {
            createdAt: 'desc'
        }
    });
}
