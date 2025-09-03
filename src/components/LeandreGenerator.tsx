import React, { useState, useEffect, useCallback, useRef } from 'react';
import confetti from 'canvas-confetti';
import { createEvent } from 'ics';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Copy, Heart, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const COMPLIMENTS = [
  "Leandre, Duchess of Sunshine",
  "Leandre, Professional Sock Finder",
  "Leandre, CEO of Serotonin",
  "Leandre, Certified Cloud 9 Pilot",
  "Leandre, Supreme Ruler of Cozy Vibes",
  "Leandre, Snack Sommelier",
  "Leandre, Head of Giggles Dept.",
  "Leandre, Quantum Hug Generator",
  "Leandre, Champion of Comfy Sweaters",
  "Leandre, Bringer of Unexpected Rainbows",
  "Leandre, Chief Calendar Cutie",
  "Leandre, Licensed Playlist Curator",
  "Leandre, Meme Archivist (Level 999)",
  "Leandre, Chaos Wrangler (Friendly)",
  "Leandre, Master of Silly Walks",
  "Leandre, Director of Dramatic Gasping",
  "Leandre, Supreme High-Five Commissioner",
  "Leandre, Pixel Princess of Perfect Timing",
  "Leandre, Vibesmith Extraordinaire",
  "Leandre, Collector of Tiny Joys",
  "Leandre, Professional Day-Brightener",
  "Leandre, Keeper of Lost Pens",
  "Leandre, Caffeine Whisperer",
  "Leandre, Certified Cookie Taste-Tester",
  "Leandre, Ambassador of Wholesome Mischief",
  "Leandre, Gravity's Favorite Exception",
  "Leandre, Laugh Architect",
  "Leandre, Sparkle Logistics Manager",
  "Leandre, Director of Unexpected Whims",
  "Leandre, Adventure RSVP Enthusiast",
  "Leandre, Cozy Blanket Strategist",
  "Leandre, Sunshine in Sneakers",
  "Leandre, Head of Cute Reactions",
  "Leandre, Professional \"One More Episode\" Negotiator",
  "Leandre, Subtle Wink Specialist",
  "Leandre, Rainy-Day Picnic Planner",
  "Leandre, Official Duck Pond Consultant",
  "Leandre, Emoji Grammar Professor",
  "Leandre, Midnight Snack Philosopher",
  "Leandre, Chair of Anti-Boredom",
  "Leandre, Serendipity's Favorite",
  "Leandre, CEO of Inside Jokes",
  "Leandre, PTO: Permanent Tenderness Officer",
  "Leandre, Chief Compliment Officer",
  "Leandre, Stardust Distributor",
  "Leandre, Cozy Lightning Bolt",
  "Leandre, Smol Chaos, Big Heart",
  "Leandre, Connoisseur of Cute Dogs",
  "Leandre, Certified \"Wow\" Moment Maker",
  "Leandre, Captain of Team Yes"
];

const RARE_COMPLIMENTS = [
  "Leandre, Limitless Golden Rarity",
  "Leandre, Mythical Good-Vibe Dragon",
  "Leandre, Ultra-Shiny Legendary Friend",
  "Leandre, 1-in-100 Sparkle Drop"
];

export default function LeandreGenerator() {
  const [currentCompliment, setCurrentCompliment] = useState('');
  const [counter, setCounter] = useState(0);
  const [history, setHistory] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [keySequence, setKeySequence] = useState('');
  const [lastKeyTime, setLastKeyTime] = useState(0);
  const [showSecretHint, setShowSecretHint] = useState(false);
  const [isAccepted, setIsAccepted] = useState(false);
  const [isTypewriting, setIsTypewriting] = useState(false);
  
  const { toast } = useToast();
  const generateRef = useRef<HTMLButtonElement>(null);
  const copyRef = useRef<HTMLButtonElement>(null);
  const secretRef = useRef<HTMLButtonElement>(null);

  // Check for secret triggers
  useEffect(() => {
    if (counter >= 7) {
      setShowSecretHint(true);
    }
  }, [counter]);

  // Handle keyboard sequence
  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      const now = Date.now();
      const timeDiff = now - lastKeyTime;
      
      if (timeDiff > 3000) {
        setKeySequence('');
      }
      
      setLastKeyTime(now);
      const newSequence = keySequence + e.key.toLowerCase();
      setKeySequence(newSequence);
      
      if (newSequence.endsWith('l13')) {
        triggerSecret();
        setKeySequence('');
      }
    };

    window.addEventListener('keydown', handleKeydown);
    return () => window.removeEventListener('keydown', handleKeydown);
  }, [keySequence, lastKeyTime]);

  const triggerSecret = useCallback(() => {
    setIsModalOpen(true);
    // Golden confetti burst
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#FFD700', '#FFA500', '#FF69B4', '#DDA0DD']
    });
  }, []);

  const generateCompliment = useCallback(() => {
    if (generateRef.current) {
      generateRef.current.classList.add('wiggle');
      setTimeout(() => {
        generateRef.current?.classList.remove('wiggle');
      }, 600);
    }

    const isRare = Math.random() < 0.01; // 1% chance
    const compliments = isRare ? RARE_COMPLIMENTS : COMPLIMENTS;
    let newCompliment;
    
    do {
      newCompliment = compliments[Math.floor(Math.random() * compliments.length)];
    } while (newCompliment === currentCompliment && compliments.length > 1);
    
    setIsTypewriting(true);
    setCurrentCompliment(newCompliment);
    setCounter(prev => prev + 1);
    setHistory(prev => [newCompliment, ...prev.slice(0, 7)]);

    // Confetti effects
    if (isRare) {
      // Golden confetti for rare
      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.6 },
        colors: ['#FFD700', '#FFA500', '#FFFF00'],
        shapes: ['star'],
        scalar: 1.2
      });
      
      // Play sparkle sound (if supported)
      try {
        const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+P2u2YdBDGH0fPTgjEGHm7A7+OZURE');
        audio.volume = 0.3;
        audio.play().catch(() => {}); // Ignore errors
      } catch {}
    } else {
      // Regular confetti
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#FF69B4', '#DDA0DD', '#FFB6C1', '#F0E68C']
      });
    }

    setTimeout(() => setIsTypewriting(false), 1500);
  }, [currentCompliment]);

  const copyToClipboard = useCallback(async (text: string, source: 'current' | 'history') => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        description: "Copied! ✨",
        duration: 2000,
      });
      
      if (source === 'current' && copyRef.current) {
        copyRef.current.classList.add('wiggle');
        setTimeout(() => {
          copyRef.current?.classList.remove('wiggle');
        }, 600);
      }
    } catch {
      toast({
        description: "Couldn't copy, but the compliment is still amazing! 💖",
        variant: "destructive",
        duration: 3000,
      });
    }
  }, [toast]);

  const handleAccept = useCallback(() => {
    setIsAccepted(true);
    
    // Epic confetti celebration
    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 30,
        spread: 70,
        origin: { x: Math.random(), y: Math.random() * 0.5 + 0.3 },
        colors: ['#FFD700', '#FF69B4', '#DDA0DD', '#FFA500', '#FFFF00']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();

    // Generate calendar file
    const event = {
      start: [2025, 9, 13, 14, 0] as [number, number, number, number, number],
      duration: { hours: 3 },
      title: 'Hangout with Someone Special 💖',
      description: 'Coffee at That Cute Café → walk in the park → mini-golf',
      location: 'That Cute Café (and beyond!)',
      status: 'CONFIRMED' as const,
      busyStatus: 'BUSY' as const,
      organizer: { name: 'Someone Special', email: 'hello@example.com' }
    };

    createEvent(event, (error, value) => {
      if (!error && value) {
        const blob = new Blob([value], { type: 'text/calendar' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'hangout-with-me.ics';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      }
    });
  }, []);

  const handleRainCheck = useCallback(() => {
    setIsModalOpen(false);
    toast({
      description: "No worries! Another silly title awaits 😄",
      duration: 3000,
    });
  }, [toast]);

  return (
    <div className="min-h-screen bg-gradient-hero">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-6xl md:text-7xl font-playful font-bold text-foreground mb-4 float-gentle">
            Random Leandre Generator <span className="text-4xl md:text-5xl">💫</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground font-medium">
            Tap the button for a brand-new, ridiculous title.
          </p>
        </header>

        {/* Main Generator Card */}
        <main className="mb-12">
          <Card className="card-gradient border-0 p-8 md:p-12 text-center">
            <div className="space-y-8">
              {/* Generate Button */}
              <Button
                ref={generateRef}
                onClick={generateCompliment}
                size="lg"
                className="button-gradient text-white font-bold px-8 py-4 text-lg rounded-2xl hover:bg-primary-hover border-0"
                aria-label="Generate a new compliment for Leandre"
              >
                <Sparkles className="mr-2 h-5 w-5" />
                Generate
              </Button>

              {/* Result Display */}
              {currentCompliment && (
                <div className="space-y-6">
                  <div 
                    className={`text-3xl md:text-4xl font-playful font-bold text-foreground transform rotate-1 ${isTypewriting ? 'typewriter' : 'fade-in'}`}
                    style={{ fontWeight: 700 }}
                    aria-live="polite"
                  >
                    {currentCompliment}
                  </div>

                  {/* Counter and Copy */}
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <span className="text-muted-foreground font-medium">
                      Title #{counter}
                    </span>
                    <Button
                      ref={copyRef}
                      onClick={() => copyToClipboard(currentCompliment, 'current')}
                      variant="outline"
                      size="sm"
                      className="rounded-full hover:bg-secondary-hover"
                      aria-label="Copy current compliment to clipboard"
                    >
                      <Copy className="mr-2 h-4 w-4" />
                      Copy to clipboard
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </Card>

          {/* History */}
          {history.length > 0 && (
            <Card className="mt-8 card-gradient border-0 p-6">
              <h3 className="text-xl font-playful font-semibold text-foreground mb-4 text-center">
                Recent Titles
              </h3>
              <div className="grid gap-2 max-h-64 overflow-y-auto">
                {history.map((item, index) => (
                  <button
                    key={`${item}-${index}`}
                    onClick={() => copyToClipboard(item, 'history')}
                    className="text-left p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors text-muted-foreground hover:text-foreground fade-in"
                    aria-label={`Copy "${item}" to clipboard`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </Card>
          )}
        </main>

        {/* Footer with Secret */}
        <footer className="text-center space-y-4">
          <p className="text-muted-foreground">
            Made with <Heart className="inline h-4 w-4 text-primary" /> for the amazing Leandre
          </p>
          <button
            ref={secretRef}
            onClick={triggerSecret}
            className={`text-xs text-muted-foreground/25 hover:text-muted-foreground transition-all duration-300 underline ${showSecretHint ? 'animate-pulse' : ''}`}
            aria-label="Secret surprise"
          >
            pssst… click here
          </button>
        </footer>

        {/* Secret Modal */}
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="secret-gradient border-0 max-w-lg">
            <DialogHeader>
              <DialogTitle className="text-2xl font-playful text-center">
                Hey Leandre 💖
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-6 text-center">
              <div className="text-foreground space-y-4">
                <p>I've been joking around, but here's the real bit:</p>
                <p className="font-semibold">
                  Wanna hang out with me on Saturday, September 13, 2025?
                </p>
                <p>
                  I was thinking coffee at That Cute Café → walk in the park → mini-golf around 2 PM.
                </p>
                <p>If you're in, hit the button — confetti guaranteed.</p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                {!isAccepted ? (
                  <>
                    <Button
                      onClick={handleAccept}
                      className="button-gradient text-white font-bold border-0"
                    >
                      I'm in! 🎉
                    </Button>
                    <Button
                      onClick={handleRainCheck}
                      variant="outline"
                      className="hover:bg-secondary-hover"
                    >
                      Rain check
                    </Button>
                  </>
                ) : (
                  <div className="space-y-2">
                    <Button disabled className="button-gradient text-white font-bold border-0">
                      Yay! See you there 🎉
                    </Button>
                    <p className="text-sm text-muted-foreground">
                      Calendar event downloaded! 📅
                    </p>
                  </div>
                )}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}