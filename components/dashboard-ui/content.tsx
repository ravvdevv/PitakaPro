"use client";
import { useMemo, useState, useEffect } from "react";
import { Wallet, PiggyBank, TrendingUp, TrendingDown, PieChart, WifiOff } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { useNetworkStatus } from "@/hooks/use-network-status";
import { storageKeys, getOfflineData, setOfflineData } from "@/lib/data";

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

type Goal = {
  id: number;
  name: string;
  saved: number;
  total: number;
};

export default function Content() {
  // Use custom hook for localStorage management
  const [transactions] = useLocalStorage<Transaction[]>(storageKeys.transactions, []);
  const [allAccounts] = useLocalStorage<Account[]>(storageKeys.accounts, []);
  const [goals] = useLocalStorage<Goal[]>(storageKeys.goals, []);
  const { isOnline } = useNetworkStatus();

  // Memoize expensive calculations to avoid recomputation on every render
  const { totalIncome, totalExpense, currentAccountBalances } = useMemo(() => {
    let income = 0;
    let expense = 0;
    const accountBalances: Record<string, number> = {};

    // Initialize account balances with initial balances
    allAccounts.forEach((acc) => {
      accountBalances[acc.name] = acc.initialBalance;
    });

    transactions.forEach((t) => {
      if (t.type === "income") {
        income += t.amount;
      } else {
        expense += Math.abs(t.amount);
      }

      if (t.account && accountBalances[t.account] !== undefined) {
        accountBalances[t.account] += t.amount;
      }
    });

    return { totalIncome: income, totalExpense: expense, currentAccountBalances: accountBalances };
  }, [transactions, allAccounts]);

  const netWorth = useMemo(() => {
    const totalInitialAccountBalance = allAccounts.reduce(
      (sum, acc) => sum + (acc.initialBalance || 0),
      0
    );
    const netFlow = totalIncome - totalExpense;
    return totalInitialAccountBalance + netFlow;
  }, [allAccounts, totalIncome, totalExpense]);
  

  const { totalGoalsTarget, totalGoalsSaved } = useMemo(() => ({
    totalGoalsTarget: goals.reduce((sum, g) => sum + (g.total || 0), 0),
    totalGoalsSaved: goals.reduce((sum, g) => sum + (g.saved || 0), 0)
  }), [goals]);

  const [username, setUsername] = useState('');
  
  useEffect(() => {
    // Get username from localStorage
    const savedName = localStorage.getItem('userName') || '';
    setUsername(savedName);
  }, []);
  
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-1">
              {getGreeting()}{username ? `, ${username}` : ''}!
            </h1> 
            <p className="text-sm text-muted-foreground">A quick snapshot of your money right now.</p>
          </div>
          {!isOnline && (
            <div className="flex items-center gap-2 px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm">
              <WifiOff className="w-4 h-4" />
              <span>Offline Mode</span>
            </div>
          )}
        </div>
      </div>

      {/* Summary cards powered by localStorage */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Balance</CardTitle>
            <PiggyBank className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">₱{netWorth.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">All accounts + all transactions</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Income</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold text-green-500">₱{totalIncome.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Total income (all time)</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Expenses</CardTitle>
            <TrendingDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold text-red-500">₱{totalExpense.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Total spending (all time)</p>
          </CardContent>
        </Card>
     
      </div>

      {/* Accounts, budgets, goals, and recent activity */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Accounts */}
        <Card className="md:col-span-1 lg:col-span-1">
          <CardHeader>
            <CardTitle>Accounts</CardTitle>
            <CardDescription className="text-xs">Current balances by account</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {allAccounts.length === 0 && (
              <p className="text-sm text-muted-foreground">No accounts yet.</p>
            )}
            {allAccounts.map((account) => (
              <div key={account.id} className="flex items-center justify-between text-sm">
                <span>{account.name}</span>
                <span className="font-medium">
                  ₱{(currentAccountBalances[account.name] || 0).toFixed(2)}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>

     
        {/* Goals */}
        <Card className="md:col-span-1 lg:col-span-1">
          <CardHeader>
            <CardTitle>Goals</CardTitle>
            <CardDescription className="text-xs">Savings progress toward goals</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {goals.length === 0 && (
              <p className="text-sm text-muted-foreground">No goals yet.</p>
            )}
            {goals.map((g) => (
              <div key={g.id} className="flex items-center justify-between text-sm">
                <span>{g.name}</span>
                <span className="font-medium">
                  ₱{g.saved.toFixed(2)} / ₱{g.total.toFixed(2)}
                </span>
              </div>
            ))}
            {goals.length > 0 && (
              <p className="mt-2 text-xs text-muted-foreground">
                Total saved: ₱{totalGoalsSaved.toFixed(2)} / ₱{totalGoalsTarget.toFixed(2)}
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
        {/* Recent Transactions */}
        <Card>
          <CardHeader>
            <CardTitle>Recent transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Category</TableHead>
                        <TableHead className="hidden sm:table-cell">Note</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {transactions.slice(0, 5).map(t => (
                        <TableRow key={t.id}>
                            <TableCell>{t.category}</TableCell>
                            <TableCell className="hidden sm:table-cell">{t.note}</TableCell>
                            <TableCell className={`text-right ${t.type === 'income' ? 'text-green-500' : ''}`}>₱{t.amount.toFixed(2)}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}