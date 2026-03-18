'use client'

import { useEffect, useState } from 'react';
import { apiPost } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';

export default function WhatsAppButton() {
  const { token } = useAuth();
  const [whatsappNumber, setWhatsappNumber] = useState('');

  useEffect(() => {
    const fetchConfig = async () => {
      if (token) {
        const res = await apiPost<any>('/payments/config', {}, token);
        if (res.data && res.data.whatsapp) {
          setWhatsappNumber(res.data.whatsapp);
        }
      }
    };
    fetchConfig();
  }, [token]);

  const handleWhatsApp = () => {
    const message = 'Hi, I need help with payment/subscription.';
    const url = `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  if (!whatsappNumber) return null;

  return (
    <button
      onClick={handleWhatsApp}
      className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transition-all z-50 w-16 h-16 flex items-center justify-center animate-bounce"
      title="WhatsApp Support"
    >
      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-.999.051-1.987.143-2.965.099-.794.435-1.638 1.014-2.461 1.118-1.593 2.875-2.864 5.001-3.875A9.898 9.898 0 0112 2.025c1.322 0 2.734.254 4.13.808 1.613.6 2.944 1.754 3.857 3.421.7 1.357 1.051 2.933 1.051 4.597 0 1.903-.505 3.785-1.44 5.41l-.18.21-3.638-.956.343.323c.249.295.367.632.292.966-.084.343-.418.643-.883.838z"/>
      </svg>
    </button>
  );
}

