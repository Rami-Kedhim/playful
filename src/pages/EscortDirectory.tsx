
import React from 'react';
import { Helmet } from 'react-helmet-async';
import MainLayout from '@/components/layout/MainLayout';
import EscortsModule from '@/modules/escorts/EscortsModule';
import EscortContainer from '@/components/escorts/EscortContainer';
import { useEscorts } from '@/hooks/useEscorts';

const EscortDirectoryPage: React.FC = () => {
  return <EscortsModule />;
};

export default EscortDirectoryPage;
