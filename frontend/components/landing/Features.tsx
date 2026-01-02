'use client';

import { Zap, MonitorPlay, MousePointerClick } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
    {
        title: 'Lightning Fast',
        description: 'Generate production-ready videos in minutes, not days. Our advanced AI rendering engine works at the speed of thought.',
        icon: Zap,
    },
    {
        title: 'Cinema Quality',
        description: 'Up to 4K resolution with lifelike movements, consistent characters, and professional-grade lighting and composition.',
        icon: MonitorPlay,
    },
    {
        title: 'Ease of Use',
        description: 'No technical skills needed. Our intuitive interface is designed for creators of all levels. Just type and create.',
        icon: MousePointerClick,
    },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5
        }
    }
};

export default function Features() {
    return (
        <section id="features" className="py-24 bg-card/30 border-t border-border/50 scroll-mt-20">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-16 max-w-3xl mx-auto">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
                        Why Choose AIVideo.Ai?
                    </h2>
                    <p className="text-muted-foreground md:text-xl max-w-[800px] mx-auto">
                        We combine cutting-edge technology with user-centric design to deliver the best video creation experience.
                    </p>
                </div>

                <motion.div
                    className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                >
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            className="flex flex-col items-center text-center p-6 rounded-2xl bg-background border border-border hover:border-primary/50 transition-colors duration-300 shadow-sm hover:shadow-md"
                        >
                            <div className="p-3 rounded-full bg-primary/10 text-primary mb-4">
                                <feature.icon className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                            <p className="text-muted-foreground">{feature.description}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
