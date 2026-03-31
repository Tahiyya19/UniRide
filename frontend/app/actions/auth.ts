"use server";

import prisma from '@/lib/prisma';
import { createSession, verifyPassword, hashPassword } from '@/lib/auth';
import { redirect } from 'next/navigation';

export async function loginAction(formData: FormData) {
  console.log("--- Login Action Triggered ---");
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  console.log(`Attempting login for email: ${email}`);
  
  if (!email || !password) {
    console.error("Login failed: Missing fields");
    return { error: "Missing fields" };
  }
  
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    console.error(`Login failed: No user found for email ${email}`);
    return { error: "Invalid credentials" };
  }
  console.log(`User found: ${user.name} (Role: ${user.role})`);
  
  const isValid = await verifyPassword(password, user.passwordHash);
  if (!isValid) {
    console.error(`Login failed: Invalid password for user ${email}`);
    return { error: "Invalid credentials" };
  }
  console.log("Password verification successful.");
  
  await createSession({ id: user.id, role: user.role });
  console.log(`Session created for ${user.role}: ${user.id}`);
  
  if (user.role === 'ADMIN') {
    console.log("Redirecting to /admin");
    redirect('/admin');
  }
  if (user.role === 'DRIVER') {
    console.log("Redirecting to /driver");
    redirect('/driver');
  }
  console.log("Redirecting to /rider");
  redirect('/rider');
}

export async function signupAction(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const name = formData.get('name') as string;
  const role = formData.get('role') as string;
  
  if (!email || !password || !name || !role) return { error: "Missing fields" };
  
  if (!email.endsWith('.edu')) return { error: "Must use a .edu email address" };
  
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) return { error: "Email already in use" };
  
  const passwordHash = await hashPassword(password);
  
  const user = await prisma.user.create({
    data: {
      email,
      passwordHash,
      name,
      role
    }
  });
  
  await createSession({ id: user.id, role: user.role });
  
  if (user.role === 'ADMIN') redirect('/admin');
  if (user.role === 'DRIVER') redirect('/driver');
  redirect('/rider');
}
