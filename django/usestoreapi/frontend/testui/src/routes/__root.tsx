import { createRootRoute, Outlet, Link, useNavigate, useRouter } from "@tanstack/react-router";
import { useEffect } from "react";
import useAuthStore from "../store/authStore";
import "./Nav.css";

const publicRoutes = ['/login', '/register'];

export const Route = createRootRoute({
  component: () => {
    const { token, logout } = useAuthStore();
    const navigate = useNavigate();
    const router = useRouter();
    const currentPath = router.state.location.pathname;
    const handleLogout = () => {
      logout();
      navigate({ to: '/login' });
    };

    useEffect(() => {
      if (!token && !publicRoutes.includes(currentPath)) {
        navigate({ to: '/login' });
      }
    }, [token, currentPath]);

    return (
      <div>
        <nav className="navbar">
          <a className="navbar-logo">🛒 Store</a>
          {token && (
            <div className="navbar-links-container">
              <Link to="/">Products</Link>
              <Link to="/add">Add Product</Link>
              <button className="navbar-signout-button" onClick={handleLogout}>Sign Out</button>
            </div>
          )}
        </nav>
        <Outlet />
      </div>
    );
  },
});
