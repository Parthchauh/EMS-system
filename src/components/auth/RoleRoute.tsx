import { useUserRole } from "@/hooks/useUserRole";
import { Navigate } from "react-router-dom";

interface RoleRouteProps {
  children: React.ReactNode;
  requiredRole: string;
  redirectTo?: string;
}

export function RoleRoute({ children, requiredRole, redirectTo = "/" }: RoleRouteProps) {
  const { role, isLoading } = useUserRole();

  if (isLoading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (role !== requiredRole) {
    return <Navigate to={redirectTo} replace />;
  }

  return <>{children}</>;
}
