"use server";

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

type DriverApplicationInput = {
    licenseNumber?: string;
    insurancePolicy?: string;
};

export async function submitDriverApplication(data: DriverApplicationInput) {
    void data;
    // Stub implementation
    return { success: true };
}

export async function approveDriver(driverId: string) {
    await prisma.user.update({
        where: { id: driverId },
        data: { isVerified: true }
    });
    revalidatePath('/admin/verification');
    return { success: true };
}

export async function rejectDriver(driverId: string) {
    // In a real scenario, this might delete the application or set a rejected status
    await prisma.user.delete({
        where: { id: driverId }
    });
    revalidatePath('/admin/verification');
    return { success: true };
}

export async function getPendingDrivers() {
    return await prisma.user.findMany({
        where: {
            role: 'DRIVER',
            isVerified: false
        },
        include: {
            vehicle: true
        }
    });
}
