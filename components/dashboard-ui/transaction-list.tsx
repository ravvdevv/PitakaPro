"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import TransactionForm from "./transaction-form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { categories } from "@/lib/data";
import {
  Empty,
  EmptyHeader,
  EmptyTitle,
  EmptyDescription,
} from "@/components/ui/empty";
import { Badge } from "@/components/ui/badge";
import { useLocalStorage } from "@/hooks/use-local-storage";
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  TrendingUp,
  TrendingDown,
  DollarSign,
} from "lucide-react";

type Transaction = {
  id: number;
  date: string;
  category: string;
  note: string;
  amount: number;
  type: "income" | "expense";
  account?: string;
};

type Account = {
  id: number;
  name: string;
  initialBalance: number;
};

export default function TransactionList() {
  const [transactions, setTransactions] = useLocalStorage<Transaction[]>(
    "transactions",
    []
  );
  const [accounts] = useLocalStorage<Account[]>("accounts", []);

  const [isFormVisible, setIsFormVisible] = useState(false);
  const [formType, setFormType] = useState<"income" | "expense">("expense");
  const [editingTransaction, setEditingTransaction] =
    useState<Transaction | null>(null);

  const [filterCategory, setFilterCategory] = useState<string>("");
  const [filterDate, setFilterDate] = useState<string>("");
  const [showFilters, setShowFilters] = useState<boolean>(false);

  const openForm = (
    type: "income" | "expense",
    transaction: Transaction | null = null
  ) => {
    setFormType(type);
    setEditingTransaction(transaction);
    setIsFormVisible(true);
  };

  const handleDelete = (id: number) => {
    setTransactions(transactions.filter((t) => t.id !== id));
  };

  const handleSave = (
    transaction: Omit<Transaction, "id"> & { id?: number }
  ) => {
    if (transaction.id) {
      setTransactions((prevTransactions) =>
        prevTransactions.map((t) =>
          t.id === transaction.id ? (transaction as Transaction) : t
        )
      );
    } else {
      const newTransaction = { ...transaction, id: Date.now() } as Transaction;
      setTransactions((prevTransactions) => [
        newTransaction,
        ...prevTransactions,
      ]);
    }
    setIsFormVisible(false);
  };

  const filteredTransactions = useMemo(() => {
    return transactions.filter((t) => {
      const categoryMatch =
        !filterCategory ||
        filterCategory === "all" ||
        t.category.toLowerCase() === filterCategory;
      const dateMatch = filterDate ? t.date === filterDate : true;
      return categoryMatch && dateMatch;
    });
  }, [transactions, filterCategory, filterDate]);

  const totalIncome = useMemo(() => {
    return filteredTransactions
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + t.amount, 0);
  }, [filteredTransactions]);

  const totalExpense = useMemo(() => {
    return filteredTransactions
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + Math.abs(t.amount), 0);
  }, [filteredTransactions]);

  const netFlow = useMemo(
    () => totalIncome - totalExpense,
    [totalIncome, totalExpense]
  );

  const clearFilters = () => {
    setFilterCategory("");
    setFilterDate("");
  };

  return (
    <>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0">
            <h1 className="text-3xl font-bold text-foreground">Transactions</h1>
            <div className="flex gap-2 w-full md:w-auto">
                <Button onClick={() => openForm("expense")} className="flex-1 md:flex-none">
                    <Plus className="mr-2 h-4 w-4" /> Add Expense
                </Button>
                <Button
                    variant="outline"
                    onClick={() => openForm("income")}
                    className="flex-1 md:flex-none"
                >
                    <Plus className="mr-2 h-4 w-4" /> Add Income
                </Button>
            </div>
        </div>


        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Filtered Income</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">
                +₱{totalIncome.toFixed(2)}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Filtered Expense</CardTitle>
              <TrendingDown className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-500">
                -₱{totalExpense.toFixed(2)}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Net Flow</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div
                className={`text-2xl font-bold ${
                  netFlow >= 0 ? "text-green-500" : "text-red-500"
                }`}
              >
                ₱{netFlow.toFixed(2)}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                    <CardTitle>Transaction History</CardTitle>
                    <CardDescription>
                        View and manage your recent transactions.
                    </CardDescription>
                </div>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowFilters((prev) => !prev)}
                    className="mt-4 md:mt-0"
                >
                    <Search className="mr-2 h-4 w-4" />
                    {showFilters ? "Hide Filters" : "Search / Filter"}
                </Button>
            </div>
            
          </CardHeader>
          <CardContent className="space-y-4">
            {showFilters && (
              <div className="flex flex-wrap gap-2 p-4 bg-muted/50 rounded-lg">
                <Select value={filterCategory} onValueChange={setFilterCategory}>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Filter by category" />
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
                  className="w-full sm:w-[180px]"
                  value={filterDate}
                  onChange={(e) => setFilterDate(e.target.value)}
                />
                <Button variant="ghost" onClick={clearFilters}>
                  Clear
                </Button>
              </div>
            )}

            <div className="border rounded-lg overflow-hidden">
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
                        <TableRow
                          key={transaction.id}
                          className="hover:bg-muted/50"
                        >
                          <TableCell className="whitespace-nowrap text-sm">
                            {transaction.date}
                          </TableCell>
                          <TableCell className="whitespace-nowrap text-sm">
                            <div className="flex items-center gap-2">
                              <span>{transaction.category}</span>
                              <Badge
                                variant={
                                  transaction.type === "income"
                                    ? "secondary"
                                    : "destructive"
                                }
                                className="text-[10px] px-2 py-0"
                              >
                                {transaction.type === "income"
                                  ? "Income"
                                  : "Expense"}
                              </Badge>
                            </div>
                          </TableCell>
                          <TableCell className="max-w-[200px] truncate text-sm">
                            {transaction.note}
                          </TableCell>
                          <TableCell
                            className={`text-right text-sm ${
                              transaction.type === "income"
                                ? "text-green-500"
                                : "text-red-500"
                            }`}
                          >
                            ₱{transaction.amount.toFixed(2)}
                          </TableCell>
                          <TableCell className="text-right text-sm">
                            <div className="flex justify-end gap-1">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() =>
                                  openForm(transaction.type, transaction)
                                }
                              >
                                <Pencil className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="text-red-500 hover:text-red-600"
                                onClick={() => handleDelete(transaction.id)}
                              >
                                <Trash2 className="h-4 w-4" />
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
                                Try adjusting your filters or adding a new
                                transaction.
                              </EmptyDescription>
                            </EmptyHeader>
                          </Empty>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>

              <div className="md:hidden divide-y">
                {filteredTransactions.length > 0 ? (
                  filteredTransactions.map((transaction) => (
                    <div
                      key={transaction.id}
                      className="p-3 flex flex-col gap-2"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex flex-col text-sm">
                          <span className="font-medium">
                            {transaction.category}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {transaction.date}
                          </span>
                        </div>
                        <div
                          className={`text-base font-semibold ${
                            transaction.type === "income"
                              ? "text-green-500"
                              : "text-red-500"
                          }`}
                        >
                          ₱{transaction.amount.toFixed(2)}
                        </div>
                      </div>
                      {transaction.note && (
                        <p className="text-xs text-muted-foreground">
                          {transaction.note}
                        </p>
                      )}
                      <div className="flex justify-end gap-2 pt-1">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            openForm(transaction.type, transaction)
                          }
                        >
                          <Pencil className="mr-2 h-3 w-3" /> Edit
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDelete(transaction.id)}
                        >
                          <Trash2 className="mr-2 h-3 w-3" /> Delete
                        </Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-4 text-center text-sm">
                    <Empty>
                      <EmptyHeader>
                        <EmptyTitle>No transactions found</EmptyTitle>
                      </EmptyHeader>
                    </Empty>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="fixed bottom-20 right-4 z-40 md:hidden">
        <Button
          className="rounded-full shadow-lg h-14 w-14 p-0"
          onClick={() => openForm("expense")}
        >
          <Plus className="h-6 w-6" />
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
