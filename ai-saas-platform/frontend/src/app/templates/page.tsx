'use client'

import { useState, useEffect } from 'react';
import { apiPost } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';

interface Template {
  id: string;
  name: string;
  category: string;
  preview: string;
  content: string;
}

export default function TemplatesPage() {
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

  if (loading) {
    return <div className="min-h-screen pt-20 p-8 animate-pulse"><div className="bg-gray-200 h-96 rounded-xl mx-auto max-w-4xl"></div></div>;
  }

  return (
    <div className="min-h-screen pt-20 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-4">
            Template Library
          </h1>
          <p className="text-xl text-gray-600">Premium templates for all your document needs</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {templates.map((template) => (
            <div key={template.id} className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all overflow-hidden border border-gray-200">
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-3">{template.name}</h3>
                <p className="text-gray-600 mb-4">{template.preview}</p>
                <span className="inline-block px-4 py-2 bg-primary/10 text-primary text-sm font-semibold rounded-xl">
                  {template.category.toUpperCase()}
                </span>
              </div>
              <div className="bg-gradient-to-r from-gray-50 p-6">
                <pre className="text-xs bg-white p-4 rounded-xl max-h-32 overflow-auto font-mono">{template.content.substring(0, 200)}...</pre>
              </div>
            </div>
          ))}
        </div>
        {templates.length === 0 && (
          <div className="text-center py-24">
            <p className="text-xl text-gray-500">No templates available. Premium feature coming soon!</p>
          </div>
        )}
      </div>
    </div>
  );
}

