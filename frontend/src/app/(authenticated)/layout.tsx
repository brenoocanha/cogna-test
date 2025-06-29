import CoreComponents from '@/components/core';
import { redirect } from 'next/navigation';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <div className="absolute top-4 right-4">
        <CoreComponents.LogoutButton logoutFn={logout} />
      </div>
    </>
  );
}

async function logout() {
  'use server';
  const { logout } = await import('@/lib/server/utils');
  await logout().then(() => redirect('/login'));
}
