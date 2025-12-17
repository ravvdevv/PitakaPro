'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button";
import { HelpCircle, Trash2 } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export function HelpDialog() {

  const handleResetData = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="w-full justify-start">
          <HelpCircle className="mr-2 h-4 w-4" />
          Help & Support
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Help & Support</DialogTitle>
          <DialogDescription>
            Find answers to common questions and learn more about PitakaPro.
          </DialogDescription>
        </DialogHeader>

        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>How do I add a transaction?</AccordionTrigger>
            <AccordionContent>
              Navigate to the "Transactions" page from the navigation menu. Click the "Add Transaction" button and fill in the details.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>How do I create an account?</AccordionTrigger>
            <AccordionContent>
              Go to the "Accounts" page and click "Add Account". Give it a name and an initial balance to get started.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Where is my data stored?</AccordionTrigger>
            <AccordionContent>
              All your financial data is stored locally in your browser's storage. It is not sent to any server.
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <div className="pt-6">
            <h3 className="text-lg font-semibold mb-2">Danger Zone</h3>
            <div className="flex items-center justify-between p-4 border border-destructive/50 rounded-lg bg-destructive/10">
                <div>
                    <h4 className="font-medium">Reset All Data</h4>
                    <p className="text-sm text-muted-foreground">This will permanently delete all your data.</p>
                </div>
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button variant="destructive">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Reset
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete all your
                            accounts, transactions, budgets, and goals data from your browser.
                        </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleResetData}>Yes, delete everything</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        </div>

        <DialogFooter className="mt-4">
            <div className="text-xs text-muted-foreground text-center w-full">
                Built with ❤️ by Raven
            </div>
        </DialogFooter>

      </DialogContent>
    </Dialog>
  );
}
