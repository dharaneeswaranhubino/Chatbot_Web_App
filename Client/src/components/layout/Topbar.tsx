import { Link } from "react-router-dom";
import logo from "../../assets/ConvoCore_logo.png";
import { useAppSelector } from "../../hooks/reduxHooks";
import ProfileDropdown from "./ProfileDropdown";

const Topbar = () => {
  const { user } = useAppSelector((state) => state.auth);
  const userRoles = user?.roles || [];
  const isUserRole = userRoles.includes("user");
  return (
    <>
      <div className="fixed top-0 left-0 right-0 h-16 bg-white shadow flex items-center justify-between px-6">
        <div className="flex items-center gap-2">
          <Link to={isUserRole?"/userDashboard":"/dashboard"}>
            <div className="w-12 h-12 rounded-full overflow-hidden border">
              <img
                src={logo}
                alt="App Logo"
                className="w-full h-full object-cover"
              />
            </div>
          </Link>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm">{user?.name}</span>
          <ProfileDropdown />
        </div>
      </div>
    </>
  );
};

export default Topbar;
