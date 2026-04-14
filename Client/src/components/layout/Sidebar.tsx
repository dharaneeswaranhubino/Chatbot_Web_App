import { NavLink } from "react-router-dom";
import { FaUsers, FaUserShield, FaKey, FaRobot, FaHome, FaTachometerAlt } from "react-icons/fa";
import useRole from "../../hooks/useRole";
import { useAppSelector } from "../../hooks/reduxHooks";

interface MenuItem {
  name: string;
  path: string;
  allowedRoles: string[];
  icon?: React.ReactNode;
}

const menu: MenuItem[] = [
  {
    name: "Dashboard",
    path: "/dashboard",
    allowedRoles: ["admin", "manager"],
    icon: <FaTachometerAlt />,
  },
  {
    name:"User Dashoard",
    path:"/userDashboard",
    allowedRoles:["user"],
    icon:<FaHome />
  },
  {
    name: "Users",
    path: "/users",
    allowedRoles: ["admin", "manager"],
    icon: <FaUsers />,
  },
  {
    name: "Roles",
    path: "/roles",
    allowedRoles: ["admin"],
    icon: <FaUserShield />,
  },
  {
    name: "Permissions",
    path: "/permissions",
    allowedRoles: ["admin"],
    icon: <FaKey />,
  },
  {
    name: "Chatbot",
    path: "/chatbot",
    allowedRoles: ["admin", "manager", "user"],
    icon: <FaRobot />,
  },
];

const Sidebar = () => {
  const { hasRole } = useRole();
  const { isInitialized, user } = useAppSelector((state) => state.auth);

  const getFirstLetterCapital = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  if (!isInitialized || !user) {
    return (
      <div className="w-64 bg-white shadow-md p-5">
        <div className="text-xl font-bold ml-10 mb-4 whitespace-nowrap">
          Loading Panel ...
        </div>
        <p className="text-gray-500 ml-5">Loading...</p>
      </div>
    );
  }

  const filteredMenu = menu.filter((item) => hasRole(item.allowedRoles));

  return (
    <div className="w-64 bg-white shadow-md p-5">
      <div className="text-xl font-bold ml-10 mb-4 whitespace-nowrap">{`${getFirstLetterCapital(user?.roles[0])} Panel`}</div>
      <nav className="space-y-3">
        {filteredMenu.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `block p-2 rounded ${isActive ? "bg-blue-500 text-white" : "hover:bg-gray-200"}`
            }
          >
            <span className="mr-2 flex items-center gap-3">
              {item.icon} {item.name}
            </span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
