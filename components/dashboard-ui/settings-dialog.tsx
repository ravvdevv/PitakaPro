'use client';

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

        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input id="username" defaultValue="@raven" className="col-span-3" />
          </div>
          
          <div className="space-y-2">
            <Label>Shoutout Credits</Label>
            <div className="flex items-center h-10 px-3 py-2 text-sm border rounded-md bg-muted/50">
              Special shoutout: Sylvest James Gaborno ❤️
            </div>
            <p className="text-sm text-muted-foreground">
              Thank you for your support and contributions!
            </p>
            <p className="text-xs text-center text-muted-foreground pt-4">
              Made with ❤️ by Raven
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
