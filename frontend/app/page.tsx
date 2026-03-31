import React from 'react';
import Link from 'next/link';
import { User, Car, ShieldCheck, ArrowRight } from 'lucide-react';

const roles = [
  {
    title: 'Rider',
    description: 'Book campus rides quickly and safely',
    icon: User,
    href: '/login/rider',
    iconBg: 'bg-primary/10',
    iconColor: 'text-primary',
  },
  {
    title: 'Driver',
    description: 'Go online and start accepting ride requests',
    icon: Car,
    href: '/login/driver',
    iconBg: 'bg-accent/10',
    iconColor: 'text-accent',
  },
  {
    title: 'Admin',
    description: 'Monitor ecosystem and manage verifications',
    icon: ShieldCheck,
    href: '/login/admin',
    iconBg: 'bg-secondary/10',
    iconColor: 'text-secondary',
  },
];

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background font-sans">
      <main className="flex-1 flex flex-col justify-center max-w-sm mx-auto w-full px-5 py-10 space-y-10">

        {/* Brand */}
        <div className="flex flex-col items-center gap-3 pt-4">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-sm bg-primary">
            <Car size={30} className="text-white" />
          </div>
          <div className="text-center">
            <h1 className="text-3xl font-extrabold tracking-tight text-primary">
              UniRide
            </h1>
            <p className="text-sm mt-1 text-secondary">
              Campus-only · Verified · Safe
            </p>
          </div>
        </div>

        {/* Role Selection */}
        <div className="space-y-4">
          <p className="text-center text-xs font-bold uppercase tracking-widest text-secondary">
            Choose Your Role
          </p>
          <div className="space-y-3">
            {roles.map((role) => (
              <Link key={role.href} href={role.href} className="block group">
                <div className="flex items-center gap-4 p-4 rounded-2xl border transition-all duration-200 group-hover:-translate-y-0.5 bg-card border-card-border shadow-sm">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${role.iconBg}`}>
                    <role.icon size={22} className={role.iconColor} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-base text-primary">{role.title}</p>
                    <p className="text-xs mt-0.5 text-secondary">{role.description}</p>
                  </div>
                  <ArrowRight size={16} className="text-secondary group-hover:translate-x-1 transition-transform flex-shrink-0" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center py-5">
        <p className="text-[11px] text-secondary/60">
          Secured by University Network
        </p>
      </footer>
    </div>
  );
}
