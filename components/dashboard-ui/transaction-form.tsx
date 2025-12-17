"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { categories as allCategories } from "@/lib/data";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { useIsMobile } from "@/components/ui/use-mobile";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
  DrawerClose,
} from "@/components/ui/drawer";

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
  onSave: (transaction: Omit<Transaction, "id"> & { id?: number }) => void;
  type: "income" | "expense";
  transaction: Omit<Transaction, "id"> & { id?: number } | null;
}

export default function TransactionForm({
  onClose,
  onSave,
  type,
  transaction,
}: TransactionFormProps) {
  const [amount, setAmount] = useState(0);
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [category, setCategory] = useState("");
  const [account, setAccount] = useState("");
  const [note, setNote] = useState("");

  const [availableAccounts] = useLocalStorage<Account[]>("accounts", []);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (transaction) {
      setAmount(Math.abs(transaction.amount));
      setDate(transaction.date);
      setCategory(transaction.category);
      setNote(transaction.note || "");
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

  const title = transaction
    ? type === "expense"
      ? "Edit Expense"
      : "Edit Income"
    : type === "expense"
    ? "Add Expense"
    : "Add Income";

  const formFields = (
    <div className="space-y-4">
      {type === "expense" && (
        <div>
          <Label htmlFor="category">Category</Label>
          <Select value={category.toLowerCase()} onValueChange={setCategory}>
            <SelectTrigger id="category">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              {allCategories.map((cat) => (
                <SelectItem key={cat} value={cat.toLowerCase()}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
      <div>
        <Label htmlFor="amount">Amount</Label>
        <Input
          id="amount"
          type="number"
          inputMode="decimal"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          placeholder="0.00"
        />
      </div>
      <div>
        <Label htmlFor="date">Date</Label>
        <Input
          id="date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="account">Account</Label>
        <Select value={account} onValueChange={setAccount}>
          <SelectTrigger id="account">
            <SelectValue placeholder="Select an account" />
          </SelectTrigger>
          <SelectContent>
            {availableAccounts.length > 0 ? (
              availableAccounts.map((acc) => (
                <SelectItem key={acc.id} value={acc.name}>
                  {acc.name}
                </SelectItem>
              ))
            ) : (
              <SelectItem value="no-accounts" disabled>
                No accounts available
              </SelectItem>
            )}
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="note">Note (Optional)</Label>
        <Input
          id="note"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <Drawer open={true} onOpenChange={(open) => !open && onClose()}>
        <DrawerContent>
          <DrawerHeader className="text-left">
            <DrawerTitle>{title}</DrawerTitle>
          </DrawerHeader>
          <div className="px-4">{formFields}</div>
          <DrawerFooter className="pt-4">
            <Button onClick={handleSave}>Save Transaction</Button>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={true} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="py-4">{formFields}</div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save Transaction</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
