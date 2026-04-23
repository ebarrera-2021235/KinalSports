import { useAuthStore } from "../../features/auth/store/authStore";
import { DashboardContainer } from "../../shared/components/layout/DashboardContainer";
import {Outlet} from "react-router-dom";

export const DashboardPage = () => {
    const {user, logout} = useAuthStore();
    return (
        <DashboardContainer user={user} onLogout={logout}>
            <Outlet/>
        </DashboardContainer>
    )
}



