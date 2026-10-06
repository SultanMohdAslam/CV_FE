import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { api } from '../services/api';

const CvContext = createContext(null);

export function CvProvider({ children }) {
  const [cvData, setCvData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  const fetchCv = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await api.getCv();
      setCvData(data);
    } catch (err) {
      console.error('Failed to load CV data:', err);
      setError(err.message || 'Failed to connect to backend server');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCv();
  }, [fetchCv]);

  const value = {
    cvData,
    loading,
    error,
    refreshCv: fetchCv,
    isAdminOpen,
    setIsAdminOpen,
  };

  return <CvContext.Provider value={value}>{children}</CvContext.Provider>;
}

export function useCv() {
  const context = useContext(CvContext);
  if (!context) {
    throw new Error('useCv must be used within a CvProvider');
  }
  return context;
}
