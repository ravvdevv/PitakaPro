'use client';

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function SettingsDialog() {
  const [username, setUsername] = useState('');
  const [initialUsername, setInitialUsername] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    // Load username from localStorage when component mounts
    const savedUsername = localStorage.getItem('userName') || '';
    setUsername(savedUsername);
    setInitialUsername(savedUsername);
  }, []);

  const hasChanges = username !== initialUsername;

  const handleSave = () => {
    if (!hasChanges) return;
    
    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      localStorage.setItem('userName', username.trim());
      setInitialUsername(username);
      setSaveSuccess(true);
      setIsSaving(false);
      
      // Hide success message after 2 seconds
      setTimeout(() => setSaveSuccess(false), 2000);
    }, 500);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="w-full justify-start px-4 py-2.5 h-auto">
          <Settings className="h-4 w-4 mr-3" />
          <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground">Settings</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Account Settings</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4 relative">
          {saveSuccess && (
            <div className="absolute -top-2 left-0 right-0 flex justify-center">
              <div className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                Settings saved successfully!
              </div>
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input 
              id="username" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleSave();
                }
              }}
              className="col-span-3" 
            />
          </div>
          
          <div className="space-y-2">
            <Label>Shoutout Credits</Label>
            <div className="flex items-center h-10 px-3 py-2 text-sm border rounded-md bg-muted/50">
              Special shoutout: Sylvest James Gaborno ❤️
            </div>
            <p className="text-sm text-muted-foreground">
              Thank you for your support and contributions!
            </p>
            <div className="pt-4 flex flex-col items-center space-y-4">
              {hasChanges && (
                <Button 
                  onClick={handleSave}
                  disabled={isSaving}
                  className="w-full"
                >
                  {isSaving ? 'Saving...' : 'Save Changes'}
                </Button>
              )}
              <p className="text-xs text-center text-muted-foreground">
                Made with ❤️ by Raven
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
