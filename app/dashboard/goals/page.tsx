"use client";
import { useState } from "react";
import Layout from "@/components/dashboard-ui/layout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { useLocalStorage } from "@/hooks/use-local-storage";
import GoalForm from "@/components/dashboard-ui/goal-form";
import {
  Empty,
  EmptyHeader,
  EmptyTitle,
  EmptyDescription,
} from "@/components/ui/empty";
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
} from "@/components/ui/alert-dialog";
import { Plus, Target, Pencil, Trash2 } from "lucide-react";

type Goal = {
  id: number;
  name: string;
  saved: number;
  total: number;
};

export default function GoalsPage() {
  const [goals, setGoals] = useLocalStorage<Goal[]>("goals", []);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingGoal, setEditingGoal] = useState<Goal | null>(null);

  const handleOpenForm = (goal: Goal | null = null) => {
    setEditingGoal(goal);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingGoal(null);
  };

  const handleSaveGoal = (goalToSave: Omit<Goal, 'id' | 'saved'> & { id?: number }) => {
    if (goalToSave.id) {
      setGoals((prev) =>
        prev.map((g) =>
          g.id === goalToSave.id ? { ...g, name: goalToSave.name, total: goalToSave.total } : g
        )
      );
    } else {
      const newGoal: Goal = {
        id: Date.now(),
        name: goalToSave.name,
        saved: 0,
        total: goalToSave.total,
      };
      setGoals((prev) => [...prev, newGoal]);
    }
    handleCloseForm();
  };
  
  const handleDeleteGoal = (id: number) => {
      setGoals(goals.filter((g) => g.id !== id));
  };

  const handleAddProgress = (id: number, amount: number) => {
      if (!amount || amount <= 0) return;
      setGoals(goals.map(g => g.id === id ? {...g, saved: g.saved + amount} : g))
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0">
          <h1 className="text-3xl font-bold text-foreground">Savings Goals</h1>
          <Button onClick={() => handleOpenForm()}>
            <Plus className="mr-2 h-4 w-4" /> Add Goal
          </Button>
        </div>

        {goals.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {goals.map((goal) => (
              <GoalCard
                key={goal.id}
                goal={goal}
                onEdit={() => handleOpenForm(goal)}
                onDelete={() => handleDeleteGoal(goal.id)}
                onAddProgress={handleAddProgress}
              />
            ))}
          </div>
        ) : (
          <Card className="mt-8">
              <CardContent className="pt-6">
                <Empty>
                    <EmptyHeader>
                        <EmptyTitle>No goals yet</EmptyTitle>
                        <EmptyDescription>
                            Create a new savings goal to start tracking your progress.
                        </EmptyDescription>
                    </EmptyHeader>
                    <Button onClick={() => handleOpenForm()} className="mt-4">
                        <Plus className="mr-2 h-4 w-4" /> Create Goal
                    </Button>
                </Empty>
              </CardContent>
          </Card>
        )}
      </div>

      {isFormOpen && (
        <GoalForm
          onClose={handleCloseForm}
          onSave={handleSaveGoal}
          existingGoal={editingGoal ? {id: editingGoal.id, name: editingGoal.name, total: editingGoal.total} : undefined}
        />
      )}
    </Layout>
  );
}

function GoalCard({
  goal,
  onEdit,
  onDelete,
  onAddProgress,
}: {
  goal: Goal;
  onEdit: () => void;
  onDelete: () => void;
  onAddProgress: (id: number, amount: number) => void;
}) {
  const [amount, setAmount] = useState(0);
  const progress = goal.total > 0 ? (goal.saved / goal.total) * 100 : 0;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
                <Target className="h-6 w-6 text-muted-foreground" />
                <div>
                    <CardTitle className="truncate max-w-[200px]">{goal.name}</CardTitle>
                    <CardDescription className="text-xs">
                        {progress.toFixed(0)}% complete
                    </CardDescription>
                </div>
            </div>
            <div className="flex gap-1">
                <Button variant="ghost" size="icon" onClick={onEdit}>
                    <Pencil className="h-4 w-4" />
                </Button>
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-600">
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This will permanently delete the "{goal.name}" goal.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={onDelete}>Delete</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <Progress value={progress} />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>₱{goal.saved.toFixed(2)}</span>
            <span>₱{goal.total.toFixed(2)}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="bg-muted/50 p-3">
        <div className="flex items-center gap-2 w-full">
          <Input
            type="number"
            className="h-9"
            placeholder="Add progress"
            value={amount || ""}
            onChange={(e) => setAmount(Number(e.target.value))}
          />
          <Button
            size="sm"
            onClick={() => {
                onAddProgress(goal.id, amount)
                setAmount(0)
            }}
          >
            Add
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}