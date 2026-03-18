import { useState, useEffect } from 'react';

const API_URL = '';

export interface ApiResponse<T> {
  data?: T;
  error?: string;
}

export const useApi = <T>(endpoint: string, token?: string) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const headers: HeadersInit = {
          'Content-Type': 'application/json',
        };
        if (token) {
          headers.Authorization = `Bearer ${token}`;
        }
        const res = await fetch(`${API_URL}${endpoint}`, { headers });
        const json = await res.json();
        if (res.ok) {
          setData(json as T);
        } else {
          setError(json.error || 'API error');
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint, token]);

  return { data, loading, error };
};

export const apiPost = async <T>(endpoint: string, body: any, token?: string): Promise<ApiResponse<T>> => {
  try {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
    const res = await fetch(`${API_URL}${endpoint}`, {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
    });
    const json = await res.json();
    return res.ok ? { data: json } : { error: json.error || 'Request failed' };
  } catch (err: any) {
    return { error: err.message };
  }
};

export const getToken = () => localStorage.getItem('token');
export const setToken = (token: string) => localStorage.setItem('token', token);
export const removeToken = () => localStorage.removeItem('token');
