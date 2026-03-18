'use client'

import { useState, useEffect } from 'react';
import { apiPost } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';

export default function AdminPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();

  useEffect(() => {
    const fetchUsers = async () => {
      if (token) {
        const res = await apiPost<any[]>('/admin/users', {}, token);
        if (res.data) {
          setUsers(res.data);
        }
      }
      setLoading(false);
    };
    fetchUsers();
  }, [token]);

  if (loading) return <div className="min-h-screen pt-20 p-8">Loading admin...</div>;

  return (
    <div className="min-h-screen pt-20 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-12">Admin Dashboard</h1>
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">ID</th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Name</th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Email</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-t hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">{user.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

