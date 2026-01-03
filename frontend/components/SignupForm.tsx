'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { authAPI } from '@/lib/api-endpoints';
import { useAuthStore } from '@/lib/store';

export default function SignupForm() {
  const router = useRouter();
  const login = useAuthStore((state) => state.login);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const formData = new FormData(e.currentTarget);
    const data = {
      employeeId: formData.get('employeeId') as string,
      email: formData.get('email') as string,
      password: formData.get('password') as string,
      firstName: formData.get('firstName') as string,
      lastName: formData.get('lastName') as string,
      role: 'employee',
    };

    try {
      const response: any = await authAPI.signup(data);
      login(response.data.user, response.data.token);
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Signup failed');
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

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="form-label">First Name</label>
          <input
            type="text"
            name="firstName"
            className="form-input"
            placeholder="First Name"
            aria-label="First Name"
            required
          />
        </div>
        <div>
          <label className="form-label">Last Name</label>
          <input
            type="text"
            name="lastName"
            className="form-input"
            placeholder="Last Name"
            aria-label="Last Name"
            required
          />
        </div>
      </div>

      <div>
        <label className="form-label">Employee ID</label>
        <input
          type="text"
          name="employeeId"
          className="form-input"
          placeholder="EMP001"
          aria-label="Employee ID"
          required
        />
      </div>

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
          placeholder="Create a password"
          aria-label="Password"
          required
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="btn-primary w-full"
      >
        {loading ? 'Signing up...' : 'Sign Up'}
      </button>
    </form>
  );
}
