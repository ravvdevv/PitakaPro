"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Account = {
  id: number;
  name: string;
  initialBalance: number;
};

interface AccountFormProps {
  onClose: () => void;
  onSave: (account: Omit<Account, 'id'> & { id?: number }) => void; // Allow id to be optional for new accounts
  existingAccount?: Account; // Optional prop for editing an existing account
}

export default function AccountForm({ onClose, onSave, existingAccount }: AccountFormProps) {
  const [accountName, setAccountName] = useState("");
  const [initialBalance, setInitialBalance] = useState(0);

  useEffect(() => {
    if (existingAccount) {
      setAccountName(existingAccount.name);
      setInitialBalance(existingAccount.initialBalance);
    } else {
      // Reset form for new account if no existingAccount is provided
      setAccountName("");
      setInitialBalance(0);
    }
  }, [existingAccount]);

  const handleSave = () => {
    if (accountName && initialBalance !== null && initialBalance !== undefined) {
      onSave({
        id: existingAccount?.id, // Pass existing ID if editing
        name: accountName,
        initialBalance: initialBalance,
      });
    }
  };

  const title = existingAccount ? "Edit Account" : "Add New Account";

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <div className="bg-background border rounded-lg p-8 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <div className="space-y-4">
          <div>
            <Label htmlFor="accountName">Account Name</Label>
            <Input
              id="accountName"
              value={accountName}
              onChange={(e) => setAccountName(e.target.value)}
              placeholder="e.g. Savings, Credit Card"
              required
            />
          </div>
          <div>
            <Label htmlFor="initialBalance">Initial Balance</Label>
            <Input
              id="initialBalance"
              type="number"
              value={initialBalance}
              onChange={(e) => setInitialBalance(Number(e.target.value))}
              placeholder="0.00"
              required
              min="0"
            />
          </div>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleSave}>Save Account</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
