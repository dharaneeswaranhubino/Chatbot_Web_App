export interface User {
  id: number;
  name: string;
  email: string;
  roles:string[];
  profilePicture?:string | null;
}

export interface AuthState {
  user: User | null;
  accessToken: string | null;
  loading: boolean;
  error: string | null;
  isInitialized: boolean;
  
}