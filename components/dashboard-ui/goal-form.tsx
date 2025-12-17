"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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

type Goal = {
  id: number;
  name: string;
  saved: number;
  total: number;
};

interface GoalFormProps {
  onClose: () => void;
  onSave: (goal: Omit<Goal, 'id' | 'saved'> & { id?: number }) => void;
  existingGoal?: Omit<Goal, 'saved'> & { id?: number };
}

export default function GoalForm({ onClose, onSave, existingGoal }: GoalFormProps) {
  const [name, setName] = useState("");
  const [total, setTotal] = useState(0);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (existingGoal) {
      setName(existingGoal.name);
      setTotal(existingGoal.total);
    } else {
      setName("");
      setTotal(0);
    }
  }, [existingGoal]);

  const handleSave = () => {
    if (name && total > 0) {
      onSave({
        id: existingGoal?.id,
        name,
        total,
      });
    }
  };

  const title = existingGoal ? "Edit Goal" : "Add New Goal";

  const formFields = (
    <div className="space-y-4">
      <div>
        <Label htmlFor="name">Goal Name</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. New Laptop"
        />
      </div>
      <div>
        <Label htmlFor="total">Total Amount</Label>
        <Input
          id="total"
          type="number"
          inputMode="decimal"
          value={total}
          onChange={(e) => setTotal(Number(e.target.value))}
          placeholder="0.00"
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
            <Button onClick={handleSave}>Save Goal</Button>
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
          <Button onClick={handleSave}>Save Goal</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
