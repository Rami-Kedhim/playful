import React from "react";
import { useParams } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { getEscortById } from "@/data/escortData";

const EscortLiveStreamDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const escort = id ? getEscortById(id) : null;
  
  if (!escort) {
    return (
      <MainLayout>
        <div>Escort not found</div>
      </MainLayout>
    );
  }
  
  return (
    <MainLayout>
      <div>
        <h1>{escort.name}'s Live Stream</h1>
        <p>Details about the live stream will go here.</p>
      </div>
    </MainLayout>
  );
};

export default EscortLiveStreamDetail;
