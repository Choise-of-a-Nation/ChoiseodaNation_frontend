import { Navigate, Outlet } from "react-router-dom";
import { getUserRoleFromToken } from "../../Utilits/Auth";

const AdminRoute = () => {
    const role = getUserRoleFromToken();
    //const role = "Full";

    return role === "Full" ? <Outlet /> : <Navigate to="/" />;
};

export default AdminRoute;
