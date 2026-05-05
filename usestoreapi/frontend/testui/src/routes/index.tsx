import { createFileRoute } from "@tanstack/react-router";
import TestQ from "../Querys/TestQ";

export const Route = createFileRoute("/")({
  component: TestQ,
});
