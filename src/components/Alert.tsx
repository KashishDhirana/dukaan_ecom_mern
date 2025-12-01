import { useState } from "react";
import { LuInfo as Info, LuX as X } from "react-icons/lu";

export default function Alert({ message }: { message: string }) {
  const [alert, setAlert] = useState<string>(message);

  if (!alert) return null;

  return (
    <div className="bg-gray-600">
      <div className="bg-destructive/20 border border-destructive text-destructive grid place-items-center">
        <div className="container p-2 w-full flex items-center justify-between gap-x-2">
          <div className="flex justify-center items-center gap-x-2">
            <Info />
            {alert}
          </div>
          <button
            type="button"
            className="cursor-pointer group"
            onClick={() => setAlert("")}
          >
            <X className="text-lg group-hover:outline group-hover:outline-destructive" />
          </button>
        </div>
      </div>
    </div>
  );
}
