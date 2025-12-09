"use client"
import { useState, useEffect } from "react";
import Layout from "@/components/dashboard-ui/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Budget = {
    id: number;
    category: string;
    total: number;
};

type Transaction = {
    id: number;
    category: string;
    amount: number;
    type: "income" | "expense";
    date: string;
};

// Helper function to get initial budgets from localStorage
const getInitialBudgets = (): Budget[] => {
  if (typeof window !== 'undefined') {
    const storedBudgets = localStorage.getItem("budgets");
    if (storedBudgets) {
      try {
        return JSON.parse(storedBudgets);
      } catch (e) {
        console.error("Failed to parse budgets from localStorage", e);
        localStorage.removeItem("budgets"); // Clear corrupted data
      }
    }
  }
  return [];
};

// Helper function to get initial transactions from localStorage
const getInitialTransactions = (): Transaction[] => {
  if (typeof window !== 'undefined') {
    const storedTransactions = localStorage.getItem("transactions");
    if (storedTransactions) {
      try {
        return JSON.parse(storedTransactions);
      } catch (e) {
        console.error("Failed to parse transactions from localStorage", e);
        localStorage.removeItem("transactions"); // Clear corrupted data
      }
    }
  }
  return [];
};

export default function BudgetsPage() {
    const [budgets, setBudgets] = useState<Budget[]>(getInitialBudgets());
    const [transactions, setTransactions] = useState<Transaction[]>(getInitialTransactions());
    const [newBudgetCategory, setNewBudgetCategory] = useState("");
    const [newBudgetTotal, setNewBudgetTotal] = useState(0);



    useEffect(() => {
        localStorage.setItem("budgets", JSON.stringify(budgets));
    }, [budgets]);

    const handleAddBudget = () => {
        if (newBudgetCategory && newBudgetTotal > 0) {
            const newBudget: Budget = {
                id: Date.now(),
                category: newBudgetCategory,
                total: newBudgetTotal,
            };
            setBudgets([...budgets, newBudget]);
            setNewBudgetCategory("");
            setNewBudgetTotal(0);
        }
    };

    const getSpentAmount = (category: string) => {
        const now = new Date();
        const currentMonth = now.getMonth();
        const currentYear = now.getFullYear();

        return transactions
            .filter(t => {
                if (t.category !== category || t.type !== 'expense') return false;
                const d = new Date(t.date);
                return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
            })
            .reduce((acc, t) => acc + Math.abs(t.amount), 0);
    };

    return (
        <Layout>
            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Budgets</h1>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Add New Budget</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <Label htmlFor="category">Category</Label>
                            <Input id="category" value={newBudgetCategory} onChange={e => setNewBudgetCategory(e.target.value)} placeholder="e.g. Food" />
                        </div>
                        <div>
                            <Label htmlFor="total">Total</Label>
                            <Input id="total" type="number" value={newBudgetTotal} onChange={e => setNewBudgetTotal(Number(e.target.value))} />
                        </div>
                        <Button onClick={handleAddBudget}>Add Budget</Button>
                    </CardContent>
                </Card>

                <div className="space-y-4">
                    {budgets.map(budget => {
                        const spent = getSpentAmount(budget.category);
                        const remaining = budget.total - spent;
                        const overBudget = remaining < 0;
                        const progress = budget.total > 0 ? (spent / budget.total) * 100 : 0;

                        return (
                            <Card key={budget.id}>
                                <CardHeader>
                                    <CardTitle>{budget.category}</CardTitle>
                                    <CardDescription>
                                        <span className="block text-xs text-muted-foreground">
                                            Budget: ₱{budget.total.toFixed(2)} · Spent this month: ₱{spent.toFixed(2)}
                                        </span>
                                        <span
                                            className={`text-xs font-medium ${
                                                overBudget ? "text-red-500" : "text-green-500"
                                            }`}
                                        >
                                            {overBudget
                                                ? `Over by ₱${Math.abs(remaining).toFixed(2)}`
                                                : `Remaining: ₱${remaining.toFixed(2)}`}
                                        </span>
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-2">
                                    <Progress value={progress} />
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>
            </div>
        </Layout>
    );
}