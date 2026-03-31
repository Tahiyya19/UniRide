"use server";

import prisma from "../prisma";

// Mock User ID for development (We'd get this from NextAuth in production)
const MOCK_DRIVER_ID = "driver-123";

// Ensure a mock driver exists in the database
async function ensureDriverExists() {
    const driver = await prisma.user.findUnique({ where: { id: MOCK_DRIVER_ID } });
    if (!driver) {
        await prisma.user.create({
            data: {
                id: MOCK_DRIVER_ID,
                name: "Karthik (Driver)",
                email: "driver@university.edu",
                role: "DRIVER",
                vehicle: {
                    create: {
                        name: "Toyota Glanza",
                        plate: "MH-12-AB-1234",
                        type: "4-Wheeler",
                        capacity: 4
                    }
                }
            }
        });
    }
}

export async function getDriverDashboardData() {
    await ensureDriverExists();

    const driver = await prisma.user.findUnique({
        where: { id: MOCK_DRIVER_ID },
        include: {
            vehicle: true,
            ridesAsDriver: true
        }
    });

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const ridesToday = await prisma.ride.count({
        where: {
            driverId: MOCK_DRIVER_ID,
            createdAt: { gte: today }
        }
    });

    const pendingRequests = await prisma.ride.findMany({
        where: { status: "PENDING" },
        include: { rider: true }
    });

    const activeRides = await prisma.ride.findMany({
        where: { status: "ACCEPTED", driverId: MOCK_DRIVER_ID },
        include: { rider: true }
    });

    return {
        driver,
        ridesToday,
        pendingRequests,
        activeRides,
        stats: {
            weeklyEarnings: 2450, // Mock for now, would sum from rides
            rating: 4.8
        }
    };
}

export async function acceptRide(rideId: string) {
    return await prisma.ride.update({
        where: { id: rideId },
        data: {
            status: "ACCEPTED",
            driverId: MOCK_DRIVER_ID
        },
        include: { rider: true }
    });
}

export async function declineRide(rideId: string) {
    // Just returning it to pending for another driver to pick up
    return await prisma.ride.update({
        where: { id: rideId },
        data: { status: "PENDING" }
    });
}
