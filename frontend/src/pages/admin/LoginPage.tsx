import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<{ email: string; password: string }>();

  const onSubmit = async (vals: { email: string; password: string }) => {
    setLoading(true);
    const ok = await login(vals.email, vals.password);
    setLoading(false);
    if (ok) {
      navigate('/admin/campus');
    } else {
      toast.error('Invalid email or password');
    }
  };

  return (
    <div className="min-h-screen bg-[#f0f2f5] flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="font-heading text-2xl font-bold text-darkgreen">PVET</h1>
          <p className="text-textmuted text-sm mt-1">Admin Portal</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-textdark mb-1">Email</label>
            <input {...register('email', { required: 'Email is required' })} type="email" className="w-full border border-lightgreen rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" placeholder="admin@pvet.org" />
            {errors.email && <p className="text-accent text-xs mt-1">{errors.email.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-textdark mb-1">Password</label>
            <input {...register('password', { required: 'Password is required' })} type="password" className="w-full border border-lightgreen rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" placeholder="••••••••" />
            {errors.password && <p className="text-accent text-xs mt-1">{errors.password.message}</p>}
          </div>
          <button type="submit" disabled={loading} className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary/90 disabled:opacity-50 flex items-center justify-center gap-2">
            {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Logging in...</> : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
}
