'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    // Check if username exists in localStorage
    const savedName = localStorage.getItem('userName');
    if (!savedName) {
      router.push('/');
    }
  }, [router]);

  return <>{children}</>;
}
