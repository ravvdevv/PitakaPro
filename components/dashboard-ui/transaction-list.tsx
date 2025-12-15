"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import TransactionForm from "./transaction-form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { categories } from "@/lib/data";
import { Empty, EmptyHeader, EmptyTitle, EmptyDescription } from "@/components/ui/empty";
import { Badge } from "@/components/ui/badge";
import { useLocalStorage } from "@/hooks/use-local-storage";


type Transaction = {
  id: number;
  date: string;
  category: string;
  note: string;
  amount: number;
  type: "income" | "expense";
};

type Account = {
  id: number;
  name: string;
  initialBalance: number;
};

export default function TransactionList() {
  // Use custom hook for localStorage management - reduces redundant reads/writes
  const [transactions, setTransactions] = useLocalStorage<Transaction[]>("transactions", []);
  const [accounts] = useLocalStorage<Account[]>("accounts", []);
  
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [formType, setFormType] = useState<"income" | "expense">("expense");
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);

  const [filterCategory, setFilterCategory] = useState<string>("");
  const [filterDate, setFilterDate] = useState<string>("");
  const [showFilters, setShowFilters] = useState<boolean>(false);

  const openForm = (type: "income" | "expense", transaction: Transaction | null = null) => {
    setFormType(type);
    setEditingTransaction(transaction);
    setIsFormVisible(true);
  };

  const handleDelete = (id: number) => {
    setTransactions(transactions.filter(t => t.id !== id));
  };
  
  const handleSave = (transaction: Omit<Transaction, 'id'> & { id?: number }) => {
    if (transaction.id) {
      // Edit
      setTransactions(transactions.map(t => t.id === transaction.id ? transaction as Transaction : t));
    } else {
      // Add
      const newTransaction = { ...transaction, id: Date.now() } as Transaction;
      setTransactions([newTransaction, ...transactions]);
    }
    setIsFormVisible(false);
  };

  const filteredTransactions = useMemo(() => {
    return transactions.filter(t => {
      const categoryMatch = !filterCategory || filterCategory === "all" || t.category.toLowerCase() === filterCategory;
      const dateMatch = filterDate ? t.date === filterDate : true;
      return categoryMatch && dateMatch;
    });
  }, [transactions, filterCategory, filterDate]);

  const totalIncome = useMemo(() => {
    return filteredTransactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
  }, [filteredTransactions]);

  const totalExpense = useMemo(() => {
    return filteredTransactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + Math.abs(t.amount), 0);
  }, [filteredTransactions]);

  const netFlow = useMemo(() => totalIncome - totalExpense, [totalIncome, totalExpense]);

  const totalInitialAccountBalance = useMemo(
    () => accounts.reduce((sum, acc) => sum + (Number(acc.initialBalance) || 0), 0),
    [accounts]
  );

  const combinedBalance = useMemo(
    () => totalInitialAccountBalance + netFlow,
    [totalInitialAccountBalance, netFlow]
  );

  const clearFilters = () => {
    setFilterCategory("");
    setFilterDate("");
  };

  return (
    <>
      <div className="space-y-4">
        <h1 className="text-3xl font-bold text-foreground">Transactions</h1>
        {/* Balance summary */}
        <div className="flex items-baseline justify-between">
          <span className="text-sm text-muted-foreground">Balance</span>
          <span
            className={`text-2xl font-semibold ${
              combinedBalance >= 0 ? "text-green-500" : "text-red-500"
            }`}
          >
            ₱{combinedBalance.toFixed(2)}
          </span>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Transaction List</CardTitle>
            <CardDescription>View and manage your recent transactions.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowFilters((prev) => !prev)}
                >
                  {showFilters ? "Hide Filters" : "Search / Filter"}
                </Button>
              </div>

              {/* Add Transaction Buttons */}
              <div className="flex gap-2 w-full md:w-auto justify-end">
                <Button onClick={() => openForm("expense")} className="flex-1 md:flex-none">Add Expense</Button>
                <Button
                  variant="outline"
                  onClick={() => openForm("income")}
                  className="flex-1 md:flex-none"
                >
                  Add Income
                </Button>
              </div>
            </div>

            {showFilters && (
              <div className="flex flex-wrap gap-2">
                {/* Filters */}
                <Select value={filterCategory} onValueChange={setFilterCategory}>
                  <SelectTrigger className="w-[160px]">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category.toLowerCase()}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Input
                  type="date"
                  className="w-[160px]"
                  value={filterDate}
                  onChange={(e) => setFilterDate(e.target.value)}
                />
                <Button variant="outline" onClick={clearFilters}>
                  Clear
                </Button>
              </div>
            )}

            <div className="border rounded-lg overflow-hidden">
              {/* Desktop / tablet table view */}
              <div className="hidden md:block overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Note</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTransactions.length > 0 ? (
                      filteredTransactions.map((transaction) => (
                        <TableRow key={transaction.id} className="hover:bg-muted/50">
                          <TableCell className="whitespace-nowrap text-sm">{transaction.date}</TableCell>
                          <TableCell className="whitespace-nowrap text-sm">
                          <div className="flex items-center gap-2">
                            <span>{transaction.category}</span>
                            <Badge
                              variant={transaction.type === 'income' ? 'secondary' : 'destructive'}
                              className="text-[10px] px-2 py-0"
                            >
                              {transaction.type === 'income' ? 'Income' : 'Expense'}
                            </Badge>
                          </div>
                        </TableCell>
                          <TableCell className="max-w-[200px] truncate text-sm">{transaction.note}</TableCell>
                          <TableCell
                            className={`text-right text-sm ${transaction.type === 'income' ? 'text-green-500' : 'text-red-500'}`}
                          >
                            ₱{transaction.amount.toFixed(2)}
                          </TableCell>
                          <TableCell className="text-right text-sm">
                            <div className="flex justify-end gap-1">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => openForm(transaction.type, transaction)}
                              >
                                Edit
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-red-500 hover:text-red-600"
                                onClick={() => handleDelete(transaction.id)}
                              >
                                Delete
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={5} className="h-24 text-center">
                          <Empty>
                            <EmptyHeader>
                              <EmptyTitle>No transactions found</EmptyTitle>
                              <EmptyDescription>
                                Try adjusting your filters or adding a new transaction.
                              </EmptyDescription>
                            </EmptyHeader>
                          </Empty>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>

              {/* Mobile card view */}
              <div className="md:hidden space-y-2">
                {filteredTransactions.length > 0 ? (
                  filteredTransactions.map((transaction) => (
                    <div
                      key={transaction.id}
                      className="rounded-lg border bg-card px-3 py-2 flex flex-col gap-1.5"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex flex-col text-sm">
                          <div className="flex items-center gap-2">
                            <span className="font-medium truncate max-w-[140px]">
                              {transaction.category}
                            </span>
                            <Badge
                              variant={transaction.type === 'income' ? 'secondary' : 'destructive'}
                              className="text-[10px] px-2 py-0"
                            >
                              {transaction.type === 'income' ? 'Income' : 'Expense'}
                            </Badge>
                          </div>
                          <span className="text-xs text-muted-foreground">
                            {transaction.date}
                          </span>
                        </div>
                        <div
                          className={`text-sm font-semibold text-right min-w-[84px] ${
                            transaction.type === 'income' ? 'text-green-500' : 'text-red-500'
                          }`}
                        >
                          ₱{transaction.amount.toFixed(2)}
                        </div>
                      </div>
                      {transaction.note && (
                        <div className="text-xs text-muted-foreground line-clamp-2">
                          {transaction.note}
                        </div>
                      )}
                      <div className="flex justify-end gap-2 pt-1">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => openForm(transaction.type, transaction)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-red-500 hover:text-red-600"
                          onClick={() => handleDelete(transaction.id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-4 text-center text-sm">
                    <Empty>
                      <EmptyHeader>
                        <EmptyTitle>No transactions found</EmptyTitle>
                        <EmptyDescription>
                          Try adjusting your filters or adding a new transaction.
                        </EmptyDescription>
                      </EmptyHeader>
                    </Empty>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
          {/* Removed "Load More" button */}
        </Card>
      </div>

      {/* Mobile floating add button */}
      <div className="fixed bottom-6 right-6 z-40 md:hidden">
        <Button
          className="rounded-full shadow-lg h-12 w-12 p-0"
          onClick={() => openForm("expense")}
        >
          +
        </Button>
      </div>

      {isFormVisible && (
        <TransactionForm
          type={formType}
          onClose={() => setIsFormVisible(false)}
          onSave={handleSave}
          transaction={editingTransaction}
        />
      )}
    </>
  );
}
