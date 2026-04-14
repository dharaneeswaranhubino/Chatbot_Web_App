import { Navigate } from "react-router-dom";
import { useAppSelector } from "../hooks/reduxHooks";
import useRole from "../hooks/useRole";

interface Props {
  children: React.ReactNode;
  allowedRoels: string[];
}
const RoleRoute: React.FC<Props> = ({ children, allowedRoels }) => {
  const { accessToken, isInitialized } = useAppSelector((state) => state.auth);
  const { hasRole } = useRole();
  if (!isInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!accessToken) {
    return <Navigate to="/login" replace />;
  }

  if (!hasRole(allowedRoels)) {
    return <Navigate to="/unauthorized" replace />;
  }
  return <>{children}</>;
};

export default RoleRoute;
