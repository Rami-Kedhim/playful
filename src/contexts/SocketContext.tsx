
import React, { createContext, useContext, ReactNode } from 'react';

interface SocketContextType {
  connected: boolean;
  connect: () => void;
  disconnect: () => void;
  send: (event: string, data: any) => void;
  subscribe: (event: string, handler: (data: any) => void) => void;
  unsubscribe: (event: string) => void;
}

const SocketContext = createContext<SocketContextType | undefined>(undefined);

export function SocketProvider({ children }: { children: ReactNode }) {
  // Stub implementation
  const socketValue: SocketContextType = {
    connected: false,
    connect: () => console.log('Socket connection attempted'),
    disconnect: () => console.log('Socket disconnection attempted'),
    send: (event, data) => console.log(`Socket send: ${event}`, data),
    subscribe: (event, handler) => console.log(`Socket subscribe: ${event}`),
    unsubscribe: (event) => console.log(`Socket unsubscribe: ${event}`)
  };

  return (
    <SocketContext.Provider value={socketValue}>
      {children}
    </SocketContext.Provider>
  );
}

export function useSocket() {
  const context = useContext(SocketContext);
  if (context === undefined) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
}
