import { ChatMessageRepository } from "../repositories/chatMessageRepository.js";

export class UserDashboardService {
  constructor(private chatMessageRepo: ChatMessageRepository) {}

  async getDashboardData(userId: number) {
    // Get all messages count
    const totalMessages = await this.chatMessageRepo.getTotalMessageCount(userId);
    
    // Get recent messages
    const recentMessagesData = await this.chatMessageRepo.getRecentMessages(userId, 10);
    const recentChats = recentMessagesData.slice(0, 5).map(msg => ({
      id: msg.id,
      message: msg.message,
      sender: msg.sender,
      createdAt: msg.createdAt
    }));
    
    // Get weekly activity
    const weeklyMessages = await this.chatMessageRepo.getWeeklyActivity(userId);
    
    // Calculate messages this week
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const messagesThisWeek = weeklyMessages.filter(
      msg => new Date(msg.createdAt) >= sevenDaysAgo
    ).length;
    
    // Calculate total chat sessions (approx = total messages / 2)
    const totalChatSessions = Math.ceil(totalMessages / 2);
    
    // Get last active
    const lastActive = recentMessagesData.length > 0 
      ? recentMessagesData[0]?.createdAt 
      : new Date();
    
    // Prepare activity data for last 7 days
    const activityData = this.prepareActivityData(weeklyMessages);
    
    return {
      stats: {
        totalMessages,
        totalChatSessions,
        messagesThisWeek,
        lastActive
      },
      recentChats,
      activityData
    };
  }
  
  private prepareActivityData(messages: any[]) {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const today = new Date();
    
    // Create array of last 7 days with initial count 0
    const last7Days:{date:string | undefined,fullDate:string | undefined,count:number}[] = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(today.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      const dayName = days[date.getDay()];
      last7Days.push({
        date: dayName,
        fullDate: dateStr,
        count: 0
      });
    }
    
    // Count messages per day
    messages.forEach(msg => {
      const dateStr = msg.createdAt.toISOString().split('T')[0];
      const dayEntry = last7Days.find(day => day.fullDate === dateStr);
      if (dayEntry) {
        dayEntry.count++;
      }
    });
    
    // Return only date and count
    return last7Days.map(({ date, count }) => ({ date, count }));
  }
}