// app/dashboard/transactions/page.tsx
import TransactionList from "@/components/dashboard-ui/transaction-list";
import Layout from "@/components/dashboard-ui/layout";

export default function TransactionsPage() {
  return (
    <Layout>
      <div>
        <TransactionList />
      </div>
    </Layout>
  );
}
