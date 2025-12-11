"use client"
import { useState } from "react";
import Layout from "@/components/dashboard-ui/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AccountForm from "@/components/dashboard-ui/account-form";
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

export default function AccountsPage() {
    // Use custom hook for better performance
    const [accounts, setAccounts] = useLocalStorage<Account[]>("accounts", []);
    const [transactions, setTransactions] = useLocalStorage<Transaction[]>("transactions", []);
    const [editingAccount, setEditingAccount] = useState<Account | null>(null);
    const [showAccountForm, setShowAccountForm] = useState(false);

    const handleAddAccountClick = () => {
        setEditingAccount(null);
        setShowAccountForm(true);
    };

    const handleEditAccountClick = (account: Account) => {
        setEditingAccount(account);
        setShowAccountForm(true);
    };

    const handleSaveAccountForm = (accountToSave: Omit<Account, 'id'> & { id?: number }) => {
        if (accountToSave.id) {
            // Edit existing account
            setAccounts(prevAccounts => prevAccounts.map(acc =>
                acc.id === accountToSave.id ? { ...acc, name: accountToSave.name, initialBalance: accountToSave.initialBalance } : acc
            ));
        } else {
            // Add new account
            const newAccount: Account = {
                id: Date.now(),
                name: accountToSave.name,
                initialBalance: accountToSave.initialBalance,
            };
            setAccounts(prevAccounts => [...prevAccounts, newAccount]);
        }
        setShowAccountForm(false);
        setEditingAccount(null);
    };

    const handleDeleteAccount = (accountId: number, accountName: string) => {
        // Remove the account
        setAccounts(prevAccounts => prevAccounts.filter(acc => acc.id !== accountId));
        // Remove associated transactions (or reassign them, depending on desired behavior)
        setTransactions(prevTransactions => prevTransactions.filter(t => t.account !== accountName));
    };

    const getAccountCurrentBalance = (accountName: string, allTransactions: Transaction[]) => {
        const account = accounts.find(acc => acc.name === accountName);
        if (!account) return 0;

        let balance = account.initialBalance;
        allTransactions.forEach(t => {
            if (t.account === accountName) {
                balance += t.amount;
            }
        });
        return balance;
    };

    return (
        <Layout>
            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Accounts</h1>
                    <Button onClick={handleAddAccountClick}>Add Account</Button>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                    {accounts.map(account => (
                        <Card key={account.id}>
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-sm font-medium">{account.name}</CardTitle>
                                {/* Placeholder for an icon */}
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="h-4 w-4 text-muted-foreground">
                                    <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
                                    <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
                                    <path d="M18 12a2 2 0 0 0 0 4h4v-4Z" />
                                </svg>
                            </CardHeader>
                            <CardContent className="flex justify-between items-end">
                                <div>
                                    <div className="text-2xl font-bold">${getAccountCurrentBalance(account.name, transactions).toFixed(2)}</div>
                                    <p className="text-xs text-muted-foreground">
                                        Initial: ${account.initialBalance.toFixed(2)}
                                    </p>
                                </div>
                                <div className="flex space-x-2">
                                    <Button variant="outline" size="sm" onClick={() => handleEditAccountClick(account)}>Edit</Button>
                                    <Button variant="destructive" size="sm" onClick={() => handleDeleteAccount(account.id, account.name)}>Delete</Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                    {accounts.length === 0 && (
                        <p className="text-muted-foreground">No accounts added yet. Click "Add Account" to get started.</p>
                    )}
                </div>
            </div>

            {showAccountForm && (
                <AccountForm 
                    onClose={() => setShowAccountForm(false)} 
                    onSave={handleSaveAccountForm}
                    existingAccount={editingAccount || undefined} // Pass undefined if not editing
                />
            )}
        </Layout>
    );
}