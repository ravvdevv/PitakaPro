"use client"
import { useState } from "react";
import Layout from "@/components/dashboard-ui/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLocalStorage } from "@/hooks/use-local-storage";

type Goal = {
    id: number;
    name: string;
    saved: number;
    total: number;
};

// Helper function to get initial goals from localStorage
const getInitialGoals = (): Goal[] => {
  if (typeof window !== 'undefined') {
    const storedGoals = localStorage.getItem("goals");
    if (storedGoals) {
      try {
        return JSON.parse(storedGoals);
      } catch (e) {
        console.error("Failed to parse goals from localStorage", e);
        localStorage.removeItem("goals");
      }
    }
  }
  return [];
};

export default function GoalsPage() {
    // Use custom hook for better performance
    const [goals, setGoals] = useLocalStorage<Goal[]>("goals", []);
    const [newGoalName, setNewGoalName] = useState("");
    const [newGoalTotal, setNewGoalTotal] = useState(0);
    const [addAmounts, setAddAmounts] = useState<Record<number, number>>({});

    const handleAddGoal = () => {
        if (newGoalName && newGoalTotal > 0) {
            const newGoal: Goal = {
                id: Date.now(),
                name: newGoalName,
                saved: 0,
                total: newGoalTotal,
            };
            setGoals([...goals, newGoal]);
            setNewGoalName("");
            setNewGoalTotal(0);
        }
    };

    const handleAddToGoal = (id: number) => {
        const amount = Math.abs(addAmounts[id] || 0);
        if (!amount) return;

        setGoals(prev => prev.map(goal =>
            goal.id === id
                ? { ...goal, saved: goal.saved + amount }
                : goal
        ));

        setAddAmounts(prev => ({ ...prev, [id]: 0 }));
    };

    return (
        <Layout>
            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Goals</h1>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Add New Goal</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <Label htmlFor="name">Goal Name</Label>
                            <Input id="name" value={newGoalName} onChange={e => setNewGoalName(e.target.value)} placeholder="e.g. New Laptop" />
                        </div>
                        <div>
                            <Label htmlFor="total">Total Amount</Label>
                            <Input id="total" type="number" value={newGoalTotal} onChange={e => setNewGoalTotal(Number(e.target.value))} />
                        </div>
                        <Button onClick={handleAddGoal}>Add Goal</Button>
                    </CardContent>
                </Card>

                <div className="space-y-4">
                    {goals.map(goal => {
                        const progress = goal.total > 0 ? (goal.saved / goal.total) * 100 : 0;
                        const reached = goal.saved >= goal.total && goal.total > 0;
                        const remaining = Math.max(goal.total - goal.saved, 0);

                        return (
                            <Card key={goal.id}>
                                <CardHeader className="flex flex-col gap-1">
                                    <div className="flex items-center justify-between gap-2">
                                        <CardTitle className="truncate max-w-[180px]">{goal.name}</CardTitle>
                                        <span className="text-xs text-muted-foreground whitespace-nowrap">
                                            {goal.total > 0 ? `${progress.toFixed(0)}%` : "0%"}
                                        </span>
                                    </div>
                                    <CardDescription className="text-xs">
                                        Saved ₱{goal.saved.toFixed(2)} of ₱{goal.total.toFixed(2)}
                                        {reached ? (
                                            <span className="ml-2 text-xs font-semibold text-green-500">Goal reached</span>
                                        ) : (
                                            <span className="ml-2 text-xs text-muted-foreground">
                                                Remaining: ₱{remaining.toFixed(2)}
                                            </span>
                                        )}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <Progress value={progress} />
                                    <div className="flex items-center gap-2">
                                        <Input
                                            type="number"
                                            className="h-8 w-32"
                                            placeholder="Add amount"
                                            value={addAmounts[goal.id] ?? ""}
                                            onChange={e => setAddAmounts(prev => ({
                                                ...prev,
                                                [goal.id]: Number(e.target.value),
                                            }))}
                                        />
                                        <Button
                                            size="sm"
                                            onClick={() => handleAddToGoal(goal.id)}
                                        >
                                            Save
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>
            </div>
        </Layout>
    );
}