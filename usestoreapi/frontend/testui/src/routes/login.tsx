import { createFileRoute } from "@tanstack/react-router";
import LoginPage from "../components/Login/login";

export const Route = createFileRoute("/login")({
  component: LoginPage,
});
