import { Toaster } from "@/components/ui/sonner";
import { DepotPage } from "@/pages/DepotPage";
import { HomePage } from "@/pages/HomePage";
import { RemindersPage } from "@/pages/RemindersPage";
import { SplashPage } from "@/pages/SplashPage";
import { StopsPage } from "@/pages/StopsPage";
import { TrackPage } from "@/pages/TrackPage";
import {
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
  redirect,
} from "@tanstack/react-router";

const rootRoute = createRootRoute();

const splashRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: SplashPage,
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/home",
  component: HomePage,
});

const stopsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/stops",
  component: StopsPage,
});

const depotRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/depot/$id",
  component: DepotPage,
});

const trackRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/track",
  component: TrackPage,
  validateSearch: (search: Record<string, unknown>) => ({
    routeId: typeof search.routeId === "string" ? search.routeId : undefined,
  }),
});

const remindersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/reminders",
  component: RemindersPage,
});

const catchAllRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "*",
  beforeLoad: () => {
    throw redirect({ to: "/" });
  },
  component: () => null,
});

const routeTree = rootRoute.addChildren([
  splashRoute,
  homeRoute,
  stopsRoute,
  depotRoute,
  trackRoute,
  remindersRoute,
  catchAllRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  );
}
