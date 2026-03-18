'use client'

import { useState, useEffect } from 'react';
import { apiPost } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';

export default function PaymentDetails() {
  const [config, setConfig] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();

  useEffect(() => {
    const fetchConfig = async () => {
      if (token) {
        const res = await apiPost<any>('/payments/config', {}, token);
        if (res.data) {
          setConfig(res.data);
        }
      }
      setLoading(false);
    };
    fetchConfig();
  }, [token]);

  if (loading) return <div className="animate-pulse h-64 bg-gray-200 rounded-xl"></div>;

  if (!config) return null;

  return (
    <div className="bg-gradient-to-r from-orange-50 to-pink-50 p-8 rounded-3xl border border-orange-200">
      <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Payment Methods (Pakistan)</h3>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <h4 className="text-xl font-semibold mb-4">Easypaisa</h4>
          <p className="text-2xl font-mono mb-4">{config.easypaisa}</p>
          <p className="text-sm text-gray-600 mb-4">Send payment, WhatsApp confirmation & get instant access</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <h4 className="text-xl font-semibold mb-4">Meezan Bank</h4>
          <p className="text-lg font-mono mb-2">Account: {config.meezanAccount}</p>
          <p className="text-lg font-mono">IBAN: {config.meezanIBAN}</p>
          <p className="text-sm text-gray-600 mt-4">Contact WhatsApp after transfer</p>
        </div>
      </div>
    </div>
  );
}

