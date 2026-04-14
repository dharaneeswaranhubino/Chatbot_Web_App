export interface User {
    id: number;
    name: string;
    email: string;
    createdAt: string;
    role: string[];
}

export interface UserState {
    users: User[];
    loading: boolean;
    error: string | null;
}

export interface UpdateUserData {
    id: number;
    name?: string;
    email?: string;
    password?: string;
}

export interface AssignRoleData {
    userId: number;
    roleName: string;
}