'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { authAPI } from '@/lib/api-endpoints';
import { useAuthStore } from '@/lib/store';

export default function LoginForm() {
  const router = useRouter();
  const login = useAuthStore((state) => state.login);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      const response: any = await authAPI.signin(email, password);
      login(response.data.user, response.data.token);
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      <div>
        <label className="form-label">Email</label>
        <input
          type="email"
          name="email"
          className="form-input"
          placeholder="Enter your email"
          aria-label="Email"
          required
        />
      </div>

      <div>
        <label className="form-label">Password</label>
        <input
          type="password"
          name="password"
          className="form-input"
          placeholder="Enter your password"
          aria-label="Password"
          required
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="btn-primary w-full"
      >
        {loading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
}
