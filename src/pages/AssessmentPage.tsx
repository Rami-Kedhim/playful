
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import ProjectAssessmentDashboard from '@/components/assessment/ProjectAssessmentDashboard';

const AssessmentPage: React.FC = () => {
  return (
    <MainLayout
      title="Project Assessment"
      description="Comprehensive assessment of the UberEscorts project"
    >
      <ProjectAssessmentDashboard />
    </MainLayout>
  );
};

export default AssessmentPage;
