import Hero from '@/components/landing/Hero';
import Features from '@/components/landing/Features';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <Hero />
      <Features />
      <footer className="py-8 border-t border-border flex flex-col items-center justify-center text-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} AIVideo.Ai. All rights reserved.</p>
      </footer>
    </main>
  );
}
