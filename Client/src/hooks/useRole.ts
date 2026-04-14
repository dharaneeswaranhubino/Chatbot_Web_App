import { useAppSelector } from "./reduxHooks"

const useRole = () => {
    const user = useAppSelector((state) => state.auth.user);
    const roles = user?.roles || [];

    const hasRole = (allowedRoles: string[]) => {
        if (!user) return false;
        return roles.some((role) => allowedRoles.includes(role));
    }
    return {
        roles,
        hasRole,
        isAdmin: roles.includes("admin"),
        isManager: roles.includes("manager"),
        isUser: roles.includes("user"),

    }
}

export default useRole;