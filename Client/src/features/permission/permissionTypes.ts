export interface Permission {
  id: number;
  name: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface PermissionState {
  permissions: Permission[];
  loading: boolean;
  error: string | null;
}

export interface AssignPermissionData {
  roleId: number;
  permissionName: string;
}

export interface RolePermissionResponse {
  Permission: Permission;
  roleId: number;
  permissionId: number;
}