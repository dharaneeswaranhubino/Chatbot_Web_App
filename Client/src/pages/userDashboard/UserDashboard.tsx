import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import { fetchUserDashboard } from "../../features/userDashboard/userDashboardSlice";
import UserDashboardStatCard from "../../components/userDashboard/UserDashboardStatCard";
import UserDashboardActivityChart from "../../components/userDashboard/UserDashboardActivityChart";
import UserDashboardRecentChats from "../../components/userDashboard/UserDashboardRecentChats";

const UserDashboard = () => {
  const dispatch = useAppDispatch();
  const { data, loading, error } = useAppSelector((state) => state.userDashboard);

  useEffect(() => {
    dispatch(fetchUserDashboard());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
        <p className="text-red-600">{error}</p>
        <button
          onClick={() => dispatch(fetchUserDashboard())}
          className="mt-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!data) return null;

  const statCards = [
    {
      title: "Messages",
      value: data.stats.totalMessages,
      icon: "fa-comment-dots",
    },
    {
      title: "Sessions",
      value: data.stats.totalChatSessions,
      icon: "fa-message",
    },
    {
      title: "This Week",
      value: data.stats.messagesThisWeek,
      icon: "fa-calendar-week",
    },
    {
      title: "Last Active",
      value: new Date(data.stats.lastActive).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      icon: "fa-clock",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900"><i className="fa-solid fa-chart-pie"></i>  ConvoCore Dashboard</h1>
          <div className="h-1 w-20 bg-gradient-to-r from-violet-500 to-indigo-600 mt-2 rounded-full"></div>
        </div>

        <div className="bg-gradient-to-r from-violet-500 to-indigo-600 rounded-2xl p-6 mb-8 text-white">
          <div className="flex items-center gap-3">
            <span className="text-3xl"><i className="fa-solid fa-hand"></i></span>
            <div>
              <h2 className="text-2xl font-bold">Welcome back!</h2>
              <p className="text-violet-100 mt-1">Here's what's happening with your conversations</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((card, index) => (
            <UserDashboardStatCard
              key={index}
              title={card.title}
              value={card.value}
              icon={card.icon}
            />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <UserDashboardActivityChart data={data.activityData} />
          <UserDashboardRecentChats chats={data.recentChats} />
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;