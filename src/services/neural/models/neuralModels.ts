
// Fix all specialization fields to be arrays instead of strings
export const neuralModels = [
  {
    id: "neural-model-1",
    name: "General Neural Processing",
    version: "1.0.0",
    capabilities: ["text-processing", "visual-analysis", "pattern-recognition"],
    status: "active",
    performance: {
      accuracy: 92.7,
      latency: 45,
      resourceUsage: 35
    },
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(),
    specialization: ["general", "multi-domain"], // Fixed as array
    endpoint: "/neural/general"
  },
  {
    id: "neural-model-2",
    name: "Semantic Analysis Engine",
    version: "1.2.1",
    capabilities: ["text-processing", "sentiment-analysis", "context-understanding"],
    status: "active",
    performance: {
      accuracy: 94.5,
      latency: 60,
      resourceUsage: 40
    },
    createdAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    specialization: ["text", "language"], // Fixed as array
    endpoint: "/neural/semantic"
  },
  {
    id: "neural-model-3",
    name: "Visual Processing System",
    version: "0.9.5",
    capabilities: ["visual-analysis", "object-recognition", "scene-understanding"],
    status: "active",
    performance: {
      accuracy: 91.2,
      latency: 80,
      resourceUsage: 65
    },
    createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    specialization: ["visual", "recognition"], // Fixed as array
    endpoint: "/neural/visual"
  },
  {
    id: "neural-model-4",
    name: "Pattern Recognition Engine",
    version: "1.3.0",
    capabilities: ["pattern-recognition", "anomaly-detection", "trend-analysis"],
    status: "inactive",
    performance: {
      accuracy: 89.8,
      latency: 55,
      resourceUsage: 45
    },
    createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
    specialization: ["patterns", "analytics"], // Fixed as array
    endpoint: "/neural/pattern"
  },
  {
    id: "neural-model-5",
    name: "Multimodal Integration System",
    version: "0.8.2",
    capabilities: ["text-processing", "visual-analysis", "audio-processing", "integration"],
    status: "in-development",
    performance: {
      accuracy: 87.3,
      latency: 90,
      resourceUsage: 75
    },
    createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    specialization: ["multimodal", "integration"], // Fixed as array
    endpoint: "/neural/multimodal"
  }
];
