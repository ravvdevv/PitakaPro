"use client"
import { useState, useEffect, useRef } from "react"; // Import useRef
import Layout from "@/components/dashboard-ui/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AccountForm from "@/components/dashboard-ui/account-form"; // Import the new form

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

// Helper function to get initial accounts from localStorage
const getInitialAccounts = (): Account[] => {
  if (typeof window !== 'undefined') {
    const storedAccounts = localStorage.getItem("accounts");
    if (storedAccounts) {
      try {
        return JSON.parse(storedAccounts);
      } catch (e) {
        console.error("Failed to parse accounts from localStorage", e);
        localStorage.removeItem("accounts"); // Clear corrupted data
      }
    }
  }
  return [];
};

export default function AccountsPage() {
    const [accounts, setAccounts] = useState<Account[]>(getInitialAccounts());
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [editingAccount, setEditingAccount] = useState<Account | null>(null);
    const [showAccountForm, setShowAccountForm] = useState(false);

    const handleAddAccountClick = () => {
        setEditingAccount(null); // Ensure no account is being edited
        setShowAccountForm(true);
    };

    const handleEditAccountClick = (account: Account) => {
        setEditingAccount(account);
        setShowAccountForm(true);
    };

    // Use a ref to hold the latest accounts state
    const accountsRef = useRef(accounts);
    useEffect(() => {
      accountsRef.current = accounts;
    }, [accounts]);



    // Load transactions from localStorage on mount
    useEffect(() => {
        const storedTransactions = localStorage.getItem("transactions");
        if (storedTransactions) {
            try {
                setTransactions(JSON.parse(storedTransactions));
            } catch (e) {
                console.error("Failed to parse transactions from localStorage", e);
                localStorage.removeItem("transactions"); // Clear corrupted data
                setTransactions([]); // Set to empty array to avoid further errors
            }
        }
    }, []);

    // Save accounts to localStorage whenever 'accounts' state changes
    useEffect(() => {
        localStorage.setItem("accounts", JSON.stringify(accounts));
    }, [accounts]);

    // Add beforeunload listener to ensure accounts are saved on page close/navigate
    useEffect(() => {
        const handleBeforeUnload = () => {
            localStorage.setItem("accounts", JSON.stringify(accountsRef.current));
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []); // Empty dependency array means this effect runs once on mount and cleans up on unmount.

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