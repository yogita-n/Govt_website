import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

export default function AdminProtectedRoute({ children }: { children: ReactNode }) {
  const token = localStorage.getItem('pvet_admin_token');
  if (!token) return <Navigate to="/admin/login" replace />;
  return <>{children}</>;
}
