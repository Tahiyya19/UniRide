"use server";

import prisma from '@/lib/prisma';
import { createSession, verifyPassword, hashPassword } from '@/lib/auth';
import { redirect } from 'next/navigation';

export async function loginAction(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  
  if (!email || !password) return { error: "Missing fields" };
  
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return { error: "Invalid credentials" };
  
  const isValid = await verifyPassword(password, user.passwordHash);
  if (!isValid) return { error: "Invalid credentials" };
  
  await createSession({ id: user.id, role: user.role });
  
  if (user.role === 'ADMIN') redirect('/admin');
  if (user.role === 'DRIVER') redirect('/driver');
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
