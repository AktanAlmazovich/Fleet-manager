import React from 'react';
import { motion } from 'framer-motion';

export const SkeletonCard = () => (
    <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-gray-100 dark:border-slate-700 overflow-hidden">
        <div className="animate-pulse">
            <div className="h-48 bg-gray-200 dark:bg-slate-700 rounded-xl mb-4"></div>
            <div className="h-6 bg-gray-200 dark:bg-slate-700 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded w-1/2 mb-4"></div>
            <div className="h-3 bg-gray-200 dark:bg-slate-700 rounded w-full mb-2"></div>
            <div className="h-10 bg-gray-200 dark:bg-slate-700 rounded-xl mt-4"></div>
        </div>
    </div>
);

export const SkeletonStats = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-gray-100 dark:border-slate-700">
                <div className="animate-pulse flex items-center justify-between">
                    <div>
                        <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded w-20 mb-2"></div>
                        <div className="h-8 bg-gray-200 dark:bg-slate-700 rounded w-12"></div>
                    </div>
                    <div className="h-14 w-14 bg-gray-200 dark:bg-slate-700 rounded-xl"></div>
                </div>
            </div>
        ))}
    </div>
);

export const SkeletonTable = () => (
    <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-gray-100 dark:border-slate-700">
        <div className="animate-pulse">
            <div className="h-6 bg-gray-200 dark:bg-slate-700 rounded w-1/4 mb-6"></div>
            {[...Array(5)].map((_, i) => (
                <div key={i} className="flex items-center space-x-4 py-4 border-b border-gray-100 dark:border-slate-700">
                    <div className="h-10 w-10 bg-gray-200 dark:bg-slate-700 rounded-full"></div>
                    <div className="flex-1">
                        <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded w-1/3 mb-2"></div>
                        <div className="h-3 bg-gray-200 dark:bg-slate-700 rounded w-1/4"></div>
                    </div>
                    <div className="h-6 w-20 bg-gray-200 dark:bg-slate-700 rounded-full"></div>
                </div>
            ))}
        </div>
    </div>
);

// Animation variants for cards
export const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: i * 0.1,
            duration: 0.4,
            ease: 'easeOut'
        }
    })
};

export const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: 'easeOut' }
    }
};

export const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};
