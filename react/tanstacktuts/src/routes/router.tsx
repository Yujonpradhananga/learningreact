import { createRouter } from "@tanstack/react-router";

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

const router = createRouter

