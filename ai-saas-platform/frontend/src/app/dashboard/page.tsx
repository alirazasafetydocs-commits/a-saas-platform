'use client'

import { useState } from 'react';
import { apiPost } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';

interface ResumeData {
  jobTitle: string;
  experience: Array<{ role: string; company: string; duration: string }>;
  skills: string[];
  education: string;
}

interface CoverData {
  jobTitle: string;
  company: string;
  experience: string;
}

interface GenerationResponse {
  content: string;
  format: string;
}

const tools = [
  { id: 'resume', name: 'Resume Builder', description: 'Professional resume with your experience', endpoint: '/ai/resume' },
  { id: 'cover-letter', name: 'Cover Letter', description: 'Tailored cover letter for any job', endpoint: '/ai/cover-letter' },
  { id: 'hse-docs', name: 'HSE Documents', description: 'Health & Safety templates', endpoint: '/ai/hse-docs' },
  { id: 'website', name: 'Website Code', description: 'Generate landing page code', endpoint: '/ai/website' },
];

import DownloadButtons from '@/components/DownloadButtons';
import TemplateSelector from '@/components/TemplateSelector';

export default function Dashboard() {
  const [activeTool, setActiveTool] = useState('resume');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');
  const [error, setError] = useState('');
  const { token, logout } = useAuth();

  const handleGenerate = async () => {
    setLoading(true);
    setError('');
    setResult('');

    let data: ResumeData | CoverData = {} as any;

    if (activeTool === 'resume') {
      data = {
        jobTitle: 'Software Engineer',
        experience: [
          { role: 'Developer', company: 'Tech Corp', duration: '2020-Present' },
          { role: 'Intern', company: 'StartUp', duration: '2019' },
        ],
        skills: ['React', 'Node.js', 'TypeScript', 'AI/ML'],
        education: 'BSc Computer Science, University of Example',
      };
    } else if (activeTool === 'cover-letter') {
      data = {
        jobTitle: 'Senior Developer',
        company: 'Big Tech Inc',
        experience: '5+ years in full-stack development, React expert.',
      };
    } // Add more defaults

    const res = await apiPost<GenerationResponse>(tools.find(t => t.id === activeTool)?.endpoint || '', data, token!);
    if (res.data) {
      setResult(res.data.content);
    } else {
      setError(res.error || 'Generation failed');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Dashboard
            </h1>
            <p className="text-xl text-gray-600 mt-2">Generate professional documents instantly</p>
          </div>
          <button
            onClick={logout}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-xl font-semibold"
          >
            Logout
          </button>
        </div>

        <div className="grid lg:grid-cols-4 gap-8 mb-12">
          {tools.map((tool) => (
            <div
              key={tool.id}
              onClick={() => setActiveTool(tool.id)}
              className={`p-8 rounded-2xl cursor-pointer transition-all shadow-lg hover:shadow-2xl border-2 ${
                activeTool === tool.id
                  ? 'border-primary bg-primary/10'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <h3 className="text-2xl font-bold mb-3 text-gray-900">{tool.name}</h3>
              <p className="text-gray-600 mb-4">{tool.description}</p>
              <span className={`px-4 py-1 rounded-full text-sm font-semibold ${
                activeTool === tool.id ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700'
              }`}>
                Select
              </span>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">
            {tools.find(t => t.id === activeTool)?.name} Generator
          </h2>
          <button
            onClick={handleGenerate}
            disabled={loading}
            className="w-full bg-gradient-to-r from-primary to-accent text-white py-4 px-8 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl hover:from-blue-700 hover:to-blue-800 transition-all disabled:opacity-50 mb-8"
          >
            {loading ? 'Generating...' : `Generate ${tools.find(t => t.id === activeTool)?.name}`}
          </button>
          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-xl mb-6">
              <p className="text-red-800 font-medium">{error}</p>
            </div>
          )}
{result && (
            <div className="prose max-w-none p-6 bg-gray-50 rounded-xl border mb-4">
              <pre className="whitespace-pre-wrap text-sm overflow-auto max-h-96">{result}</pre>
            </div>
          )}
          {result && <DownloadButtons content={result} filename={tools.find(t => t.id === activeTool)?.name || 'document'} />}
        </div>
      </div>
    </div>
  );
}

