"use client";
import { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { categories as allCategories } from "@/lib/data";
import { useLocalStorage } from "@/hooks/use-local-storage";

type Account = {
  id: number;
  name: string;
  initialBalance: number;
};

type Transaction = {
  id: number;
  date: string;
  category: string;
  note: string;
  amount: number;
  type: "income" | "expense";
  account?: string;
};

interface TransactionFormProps {
  onClose: () => void;
  onSave: (transaction: Omit<Transaction, 'id'> & { id?: number }) => void;
  type: "income" | "expense";
  transaction: Omit<Transaction, 'id'> & { id?: number } | null;
}

export default function TransactionForm({ onClose, onSave, type, transaction }: TransactionFormProps) {
  const [amount, setAmount] = useState(0);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [category, setCategory] = useState("");
  const [account, setAccount] = useState("");
  const [note, setNote] = useState("");
  
  // Use custom hook for better performance
  const [availableAccounts] = useLocalStorage<Account[]>("accounts", []);

  useEffect(() => {
    if (transaction) {
      setAmount(Math.abs(transaction.amount));
      setDate(transaction.date);
      setCategory(transaction.category);
      setNote(transaction.note);
      setAccount(transaction.account || "");
    }
  }, [transaction]);

  const handleSave = () => {
    const newTransaction = {
      id: transaction?.id,
      date,
      category: type === "income" ? "Income" : category,
      note,
      amount: type === "expense" ? -Math.abs(amount) : Math.abs(amount),
      type,
      account,
    };
    onSave(newTransaction);
  };

  // Memoize title calculation
  const title = useMemo(() => 
    transaction 
      ? (type === 'expense' ? 'Edit Expense' : 'Edit Income')
      : (type === 'expense' ? 'Add Expense' : 'Add Income'),
    [transaction, type]
  );

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <div className="bg-background border rounded-lg p-8 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <div className="space-y-4">
          {type === "expense" && (
            <div>
              <Label htmlFor="category">Category</Label>
              <Select value={category.toLowerCase()} onValueChange={setCategory}>
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {allCategories.map(cat => (
                    <SelectItem key={cat} value={cat.toLowerCase()}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
          <div>
            <Label htmlFor="amount">Amount</Label>
            <Input id="amount" type="number" value={amount} onChange={e => setAmount(Number(e.target.value))} />
          </div>
          <div>
            <Label htmlFor="date">Date</Label>
            <Input id="date" type="date" value={date} onChange={e => setDate(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="account">Account</Label>
            <Select value={account} onValueChange={setAccount}>
                <SelectTrigger id="account">
                    <SelectValue placeholder="Select an account" />
                </SelectTrigger>
                <SelectContent>
                    {availableAccounts.length > 0 ? (
                        availableAccounts.map(acc => (
                            <SelectItem key={acc.id} value={acc.name}>{acc.name}</SelectItem>
                        ))
                    ) : (
                        <SelectItem value="no-accounts" disabled>No accounts available</SelectItem>
                    )}
                </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="note">Note</Label>
            <Input id="note" value={note} onChange={e => setNote(e.target.value)} />
          </div>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={onClose}>Cancel</Button>
            <Button onClick={handleSave}>Save</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
