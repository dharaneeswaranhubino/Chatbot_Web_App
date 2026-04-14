interface UserDashboardStatCardProps {
  title: string;
  value: number | string;
  icon: string;
}

const UserDashboardStatCard = ({
  title,
  value,
  icon,
}: UserDashboardStatCardProps) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 flex items-center justify-between hover:shadow-md transition">
      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <p className="text-3xl text-gray-500 font-bold mt-1">{value}</p>
      </div>

      <div className="w-14 h-14 flex items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-500 text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
        <i className={`fa-solid ${icon} text-xl`} />
      </div>
    </div>
  );
};

export default UserDashboardStatCard;
