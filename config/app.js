module.exports = {
  // Server and API settings
  port: process.env.PORT || 3000,
  apiTimeout: 10000,  // 10 seconds for API calls to prevent hangs

  // BNB Chain and blockchain configs
  bnbRpcUrl: process.env.BNB_RPC_URL,
  privateKey: process.env.PRIVATE_KEY,  // For testnet deployments only

  // AI and prediction settings
  aiApiKey: process.env.MEDICAL_AI_API_KEY,
  aiModel: 'your-medical-model',  // Placeholder for Hugging Face model
  cacheEnabled: true,  // Enable caching for performance

  // Security and privacy
  encryptionKey: process.env.ENCRYPTION_KEY,
  zkpEnabled: false,  // Placeholder for future ZKP integration

  // Networking and P2P
  p2pPort: process.env.P2P_PORT || 3001,
  bootstrapNodes: [process.env.BOOTSTRAP_NODE || 'default-node'],  // For decentralized connections

  // Performance and limits
  rateLimit: 10,  // Requests per minute
  maxDataSize: 1024,  // Max KB for input data

  // Scalability and future features
  crossChainEnabled: false,  // Placeholder for Ethereum bridging
  tokenContractAddress: null,  // For MedToken incentives
  complianceMode: 'basic',  // 'basic' for now, 'full' for HIPAA later

  // Logging and debugging
  logLevel: 'info',  // 'debug' for development
  enableAuditLogs: true,  // Track predictions for compliance
};
