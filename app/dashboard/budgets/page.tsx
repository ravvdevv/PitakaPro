"use client"
import { useState, useMemo } from "react";
import Layout from "@/components/dashboard-ui/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLocalStorage } from "@/hooks/use-local-storage";

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

export default function BudgetsPage() {
    // Use custom hook for better performance
    const [budgets, setBudgets] = useLocalStorage<Budget[]>("budgets", []);
    const [transactions] = useLocalStorage<Transaction[]>("transactions", []);
    const [newBudgetCategory, setNewBudgetCategory] = useState("");
    const [newBudgetTotal, setNewBudgetTotal] = useState(0);

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

    // Memoize spent amount calculation to avoid recalculating on every render
    const spentByCategory = useMemo(() => {
        const now = new Date();
        const currentMonth = now.getMonth();
        const currentYear = now.getFullYear();

        const spent: Record<string, number> = {};
        
        transactions.forEach(t => {
            if (t.type !== 'expense') return;
            const d = new Date(t.date);
            if (d.getMonth() === currentMonth && d.getFullYear() === currentYear) {
                spent[t.category] = (spent[t.category] || 0) + Math.abs(t.amount);
            }
        });
        
        return spent;
    }, [transactions]);

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
                        const spent = spentByCategory[budget.category] || 0;
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