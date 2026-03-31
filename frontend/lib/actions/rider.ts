"use server";

import prisma from "../prisma";

const MOCK_RIDER_ID = "rider-123";

async function ensureRiderExists() {
    const rider = await prisma.user.findUnique({ where: { id: MOCK_RIDER_ID } });
    if (!rider) {
        await prisma.user.create({
            data: {
                id: MOCK_RIDER_ID,
                name: "Ram (Rider)",
                email: "rider@university.edu",
                role: "RIDER",
                campusCoins: 150,
                co2Saved: 12.5
            }
        });
    }
}

export async function getRiderDashboardData() {
    await ensureRiderExists();

    const rider = await prisma.user.findUnique({
        where: { id: MOCK_RIDER_ID },
        include: {
            ridesAsRider: {
                orderBy: { createdAt: 'desc' },
                take: 5
            },
            subscription: true
        }
    });

    return {
        rider,
        stats: {
            co2Saved: rider?.co2Saved || 0,
            campusCoins: rider?.campusCoins || 0,
            totalRides: 24 // mock historical aggregate
        }
    };
}

export async function bookRide(pickup: string, drop: string, fare: number, vehicleType: string) {
    await ensureRiderExists();

    const adjustedFare = vehicleType === '4-wheeler' ? Math.max(fare, 35) : Math.max(fare, 18);

    return await prisma.ride.create({
        data: {
            riderId: MOCK_RIDER_ID,
            pickup,
            drop,
            fare: adjustedFare,
            distance: 5.0, // Mock calculation
            status: "PENDING" // This puts it in the pool for drivers
        }
    });
}
