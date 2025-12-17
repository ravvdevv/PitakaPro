'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { OfflineBootCache } from '@/lib/offline-cache';
import { useSWReady } from '@/hooks/use-sw-ready';

export default function WelcomePage() {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { ready: swReady } = useSWReady();

  useEffect(() => {
    // Try to restore from boot cache first
    const restoreFromCache = async () => {
      try {
        const bootState = await OfflineBootCache.getBootState();
        if (bootState?.userName) {
          setName(bootState.userName);
          router.push('/dashboard');
          return;
        }
      } catch (error) {
        console.warn('Failed to restore from boot cache:', error);
      }

      // Fallback to localStorage
      const savedName = localStorage.getItem('userName');
      if (savedName) {
        setName(savedName);
        router.push('/dashboard');
      } else {
        setLoading(false);
      }
    };

    restoreFromCache();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      const userName = name.trim();
      
      // Save to localStorage (immediate)
      localStorage.setItem('userName', userName);
      
      // Save to boot cache (async, non-blocking)
      OfflineBootCache.saveBootState({
        userName,
        lastSaved: Date.now(),
        version: '1.0.0'
      }).catch(error => {
        console.warn('Failed to save boot state:', error);
      });

      router.push('/dashboard');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted/20">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted/20 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold">Welcome to PitakaPro</CardTitle>
          <CardDescription>
            Let's get started by telling us your name
          </CardDescription>
          {!swReady && (
            <div className="text-xs text-orange-600 mt-2">
              Offline mode available
            </div>
          )}
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Your Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="What's your name?"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full">
              Continue to Dashboard
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
