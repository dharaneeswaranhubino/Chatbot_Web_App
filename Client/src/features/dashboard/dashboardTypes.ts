export interface RecentUser {
    id: number,
    name: string,
    email: string,
    role: string,
    createdAt: string,
}

export interface DashboardSummary {
    totalUser: number,
    totalRole: number,
    totalPermission: number,
    totalChatSession: number,
    recentUser: RecentUser[],
}

export interface DashboardState {
    summary: DashboardSummary | null,
    loading: boolean,
    error: string | null,
}