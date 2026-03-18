'use client'

import { useState } from 'react';
import { apiPost } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';

interface DownloadButtonsProps {
  content: string;
  filename?: string;
}

export default function DownloadButtons({ content, filename = 'document' }: DownloadButtonsProps) {
  const [downloading, setDownloading] = useState<{ [key: string]: boolean }>({});
  const { token } = useAuth();

  const handleDownload = async (format: string) => {
    if (!token) return;
    setDownloading(prev => ({ ...prev, [format]: true }));
    try {
      const res = await apiPost('/download', { content, format, filename }, token);
      if (res.data) {
        // Backend sends buffer, frontend receives blob
        const blob = new Blob([res.data as any], { type: 'application/octet-stream' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${filename}.${format}`;
        a.click();
        URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error('Download failed', error);
    }
    setDownloading(prev => ({ ...prev, [format]: false }));
  };

  return (
    <div className="flex gap-3 p-4 bg-gray-100 rounded-xl mt-4">
      {(['pdf', 'docx', 'txt', 'xlsx'] as const).map((format) => (
        <button
          key={format}
          onClick={() => handleDownload(format)}
          disabled={downloading[format]}
          className="flex-1 py-3 px-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-blue-700 disabled:opacity-50 transition-all shadow-lg hover:shadow-xl"
        >
          {downloading[format] ? 'Downloading...' : `Download ${format.toUpperCase()} `}
        </button>
      ))}
    </div>
  );
}

