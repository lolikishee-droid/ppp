
export enum AppState {
  SIGNUP = 'SIGNUP',
  DASHBOARD = 'DASHBOARD'
}

export interface Transaction {
  id: string;
  type: string;
  status: string;
  amount: string;
  amountSecondary: string;
  location: string;
  timestamp: string;
}
