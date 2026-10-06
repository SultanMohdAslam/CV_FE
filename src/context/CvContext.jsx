import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { api } from '../services/api';

const CvContext = createContext(null);

export function CvProvider({ children }) {
  const [cvData, setCvData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isAdminAuthModalOpen, setIsAdminAuthModalOpen] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

  const requestOpenAdmin = useCallback(() => {
    setIsAdminAuthModalOpen(true);
  }, []);

  const authenticateAdmin = useCallback(() => {
    setIsAdminAuthenticated(true);
    setIsAdminAuthModalOpen(false);
    setIsAdminOpen(true);
  }, []);

  const closeAdmin = useCallback(() => {
    setIsAdminAuthenticated(false);
    setIsAdminOpen(false);
  }, []);

  const logoutAdmin = useCallback(() => {
    setIsAdminAuthenticated(false);
    setIsAdminOpen(false);
  }, []);

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
    isAdminAuthModalOpen,
    setIsAdminAuthModalOpen,
    isAdminAuthenticated,
    requestOpenAdmin,
    authenticateAdmin,
    closeAdmin,
    logoutAdmin,
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
