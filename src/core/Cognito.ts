
// Cognito stub implementation
export interface CognitoConfig {
  region: string;
  userPoolId?: string;
}

export const Cognito = {
  authenticate: (credentials: { username: string, password: string }) => {
    console.log("Cognito authenticate called", credentials);
    return Promise.resolve({ token: "mock-token", user: { id: "user-1" } });
  },
  
  verify: (token: string) => {
    console.log("Cognito verify called", token);
    return Promise.resolve(true);
  }
};

export default Cognito;
