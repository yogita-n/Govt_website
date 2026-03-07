import { useState, useCallback } from 'react';
import api from '@/lib/api';

export function useAuth() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isAuthenticated = !!localStorage.getItem('pvet_admin_token');

  const login = useCallback(async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const { data } = await api.post('/api/admin/auth/login', { email, password });
      localStorage.setItem('pvet_admin_token', data.token);
      return true;
    } catch {
      setError('Invalid email or password');
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('pvet_admin_token');
    window.location.href = '/admin/login';
  }, []);

  return { isAuthenticated, login, logout, isLoading, error };
}
