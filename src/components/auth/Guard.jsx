import { Navigate } from "react-router-dom";

export default function Guard({ children, token }) {
    if (!token) {
        return <Navigate to="/login" />;
    }
    return children;
}