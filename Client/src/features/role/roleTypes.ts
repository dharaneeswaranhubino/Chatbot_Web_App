export interface Role {
  id: number;
  roleName: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface RoleState {
  roles: Role[];
  loading: boolean;
  error: string | null;
}

export interface CreateRoleData {
  roleName: string;
}