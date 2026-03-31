import React from 'react';

interface GlassCardProps {
    children: React.ReactNode;
    className?: string;
    title?: string;
}

const GlassCard = ({ children, className = "", title }: GlassCardProps) => {
    return (
        <div className={`glass-card rounded-2xl p-6 ${className}`}>
            {title && (
                <h3 className="text-lg font-bold mb-4 border-b border-white/5 pb-2">
                    {title}
                </h3>
            )}
            {children}
        </div>
    );
};

export default GlassCard;
