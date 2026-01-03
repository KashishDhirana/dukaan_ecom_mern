import { createFileRoute, redirect } from "@tanstack/react-router";
import { toast } from "sonner";

export const Route = createFileRoute("/_authLayout/(auth)/profile")({
  component: RouteComponent,
  beforeLoad: () => {
    toast.error("Sorry not authenticated");
    throw redirect({
      to: "/login",
    });
  },
});

function RouteComponent() {
  return <div>Hello "/(auth)/_layout/profile"!</div>;
}
