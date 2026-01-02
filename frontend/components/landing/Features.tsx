import { Zap, MonitorPlay, MousePointerClick } from 'lucide-react';

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

export default function Features() {
    return (
        <section className="py-24 bg-card/30 border-t border-border/50">
            <div className="container px-4 md:px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
                        Why Choose AIVideo?
                    </h2>
                    <p className="text-muted-foreground md:text-xl max-w-[800px] mx-auto">
                        We combine cutting-edge technology with user-centric design to deliver the best video creation experience.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div key={index} className="flex flex-col items-center text-center p-6 rounded-2xl bg-background border border-border hover:border-primary/50 transition-colors duration-300">
                            <div className="p-3 rounded-full bg-primary/10 text-primary mb-4">
                                <feature.icon className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                            <p className="text-muted-foreground">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
