'use client'

import { useState, useEffect } from 'react';
import { apiPost } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';

interface Template {
  id: string;
  name: string;
  category: string;
  preview: string;
}

export default function TemplateSelector({ onSelect }: { onSelect: (template: Template) => void }) {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Template | null>(null);
  const { token } = useAuth();

  useEffect(() => {
    const fetchTemplates = async () => {
      if (token) {
        const res = await apiPost<Template[]>('/templates', {}, token);
        if (res.data) {
          setTemplates(res.data);
        }
      }
      setLoading(false);
    };
    fetchTemplates();
  }, [token]);

  const handleSelect = (template: Template) => {
    setSelected(template);
    onSelect(template);
  };

  if (loading) return <div className="animate-pulse bg-gray-200 h-32 rounded-xl"></div>;

  return (
    <div className="space-y-4">
      <h4 className="text-lg font-semibold text-gray-900">Template Library</h4>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-h-48 overflow-y-auto">
        {templates.map((template) => (
          <button
            key={template.id}
            onClick={() => handleSelect(template)}
            className={`p-3 rounded-xl border-2 transition-all text-left hover:shadow-lg ${
              selected?.id === template.id
                ? 'border-primary bg-primary/10 shadow-lg'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="font-semibold text-sm mb-1">{template.name}</div>
            <div className="text-xs text-gray-600 line-clamp-2">{template.preview}</div>
          </button>
        ))}
      </div>
      {selected && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-xl">
          <p className="text-sm text-green-800">Selected: {selected.name}</p>
        </div>
      )}
    </div>
  );
}

