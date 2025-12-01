import { Link } from "@tanstack/react-router";
import { RiHome3Line as Home } from "react-icons/ri";
import { Button } from "./ui/button";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-2xl">Page Not Found</p>
      <Link to="/" className="p-4">
        <Button variant={"secondary"} className="p-2 cursor-pointer">
          <Home />
          Go Home
        </Button>
      </Link>
    </div>
  );
}
