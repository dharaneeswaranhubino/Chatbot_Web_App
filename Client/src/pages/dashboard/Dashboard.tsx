import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { fetchDashboardSummary } from "../../features/dashboard/dashboardSlice";
import StatCard from "../../components/dashboard/StatCard";
import RecentUsersTable from "../../components/dashboard/RecentUsersTable";
import LoadingSpinner from "../../components/common/LoadingSpinner";

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const { summary, loading } = useAppSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(fetchDashboardSummary());
  }, [dispatch]);

   const statCards = [
    {
      title: "Total Users",
      value: summary?.totalUser || 0,
      icon: "fa-users",
    },
    {
      title: "Total Roles",
      value: summary?.totalRole || 0,
      icon: "fa-user-shield",
    },
    {
      title: "Permissions",
      value: summary?.totalPermission || 0,
      icon: "fa-key",
    },
    {
      title: "Chat Sessions",
      value: summary?.totalChatSession || 0,
      icon: "fa-comments",
    },
  ];
  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold">Dashboard Overview</h2>
      {loading || !summary ? (
        <LoadingSpinner />
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {statCards.map((card, index) => (
              <StatCard
                key={index}
                title={card.title}
                value={card.value}
                icon={card.icon}
              />
            ))}
          </div>
          <div>
            <RecentUsersTable users={summary?.recentUser} />
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
