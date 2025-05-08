
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import EscortsPage from '@/pages/EscortsPage';
import EscortDetailPage from '@/pages/EscortDetailPage';
import EscortBookingPage from '@/pages/EscortBookingPage';
import EscortReviewsPage from '@/pages/EscortReviewsPage';
import EscortGalleryPage from '@/pages/EscortGalleryPage';
import EscortDashboardPage from '@/pages/EscortDashboardPage';
import AppLayout from '@/layouts/AppLayout';
import NotFoundPage from '@/pages/NotFoundPage';

interface EscortRoutesProps {
  baseUrl?: string;
}

/**
 * Escort module routes
 */
export const EscortRoutes: React.FC<EscortRoutesProps> = ({ baseUrl = '' }) => {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<EscortsPage />} />
        <Route path=":id" element={<EscortDetailPage />} />
        <Route path=":id/book" element={<EscortBookingPage />} />
        <Route path=":id/reviews" element={<EscortReviewsPage />} />
        <Route path=":id/gallery" element={<EscortGalleryPage />} />
        <Route path="dashboard" element={<EscortDashboardPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};

export default EscortRoutes;
