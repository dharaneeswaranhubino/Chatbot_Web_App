export interface UserDashboardStats {
  totalMessages: number;
  totalChatSessions: number;
  messagesThisWeek: number;
  lastActive: string;
}

export interface RecentChat {
  id: number;
  message: string;
  sender: "user" | "bot";
  createdAt: string;
}

export interface UserActivity {
  date: string;
  count: number;
}

export interface UserDashboardData {
  stats: UserDashboardStats;
  recentChats: RecentChat[];
  activityData: UserActivity[];
}