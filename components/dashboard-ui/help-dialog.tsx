'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { HelpCircle } from "lucide-react";

export function HelpDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="w-full justify-start">
          <HelpCircle className="mr-2 h-4 w-4" />
          Help & Support
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Help & Support</DialogTitle>
        </DialogHeader>

        <section className="space-y-6 py-4">

          {/* About Section */}
          <article>
            <h3 className="text-lg font-semibold mb-1">About PitakaPro</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              PitakaPro is designed to simplify financial management.
              Track expenses, set budgets, and move confidently toward your financial goals.
            </p>
          </article>

          {/* Credits Section */}
          <article>
            <h3 className="text-lg font-semibold mb-1">Credits</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>Built with ❤️ by Raven</li>
              <li>Thanks to all contributors and supporters</li>
              <li>Special shoutout: Sylvest James Gaborno ❤️</li>
            </ul>
          </article>

        </section>
      </DialogContent>
    </Dialog>
  );
}
