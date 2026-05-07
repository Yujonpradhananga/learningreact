import { createRootRoute, Outlet, Link, useNavigate, useRouter } from "@tanstack/react-router";
import { useEffect } from "react";
import useAuthStore from "../store/authStore";

const publicRoutes = ['/login', '/register'];

export const Route = createRootRoute({
  component: () => {
    const { token, logout } = useAuthStore();
    const navigate = useNavigate();
    const router = useRouter();
    const currentPath = router.state.location.pathname;

    useEffect(() => {
      if (!token && !publicRoutes.includes(currentPath)) {
        navigate({ to: '/login' });
      }
    }, [token, currentPath]);

    const handleLogout = () => {
      logout();
      navigate({ to: '/login' });
    };

    return (
      <div>
        <nav>
          {token && (
            <>
              <Link to="/">Products</Link>
              <Link to="/add">Add Product</Link>
              <button onClick={handleLogout}>Signout</button>
            </>
          )}
          {/*
          {!token && (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
          */}
        </nav>
        <Outlet />
      </div>
    );
  },
});
