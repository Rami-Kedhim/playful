
// Pulse stub implementation
export interface PulseConfig {
  endpoint?: string;
  apiKey?: string;
}

export const Pulse = {
  send: (event: any) => {
    console.log("Pulse send called", event);
    return Promise.resolve({ status: "sent" });
  },
  
  track: (userId: string, action: string, data?: any) => {
    console.log("Pulse track called", { userId, action, data });
    return true;
  }
};

export default Pulse;
