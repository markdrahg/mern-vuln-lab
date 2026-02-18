import React, { useState, useEffect } from "react";
import { toastService, type Toast } from "../lib/toastService";

export const ToastContainer: React.FC = () => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    const unsubscribe = toastService.addListener(setToasts);
    return unsubscribe;
  }, []);

  return (
    <div className="fixed top-4 right-4 z-50 max-w-md">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`mb-3 p-4 rounded-lg shadow-lg flex items-start gap-3 animate-in slide-in-from-top fade-in ${
            toast.type === "success"
              ? "bg-green-50 border-l-4 border-green-500"
              : toast.type === "error"
                ? "bg-red-50 border-l-4 border-red-500"
                : toast.type === "warning"
                  ? "bg-yellow-50 border-l-4 border-yellow-500"
                  : "bg-blue-50 border-l-4 border-blue-500"
          }`}
        >
          <div className="flex-shrink-0 text-xl">
            {toast.type === "success"
              ? "✓"
              : toast.type === "error"
                ? "✕"
                : toast.type === "warning"
                  ? "⚠"
                  : "ℹ"}
          </div>
          <div className="flex-1">
            <p
              className={`text-sm font-medium ${
                toast.type === "success"
                  ? "text-green-800"
                  : toast.type === "error"
                    ? "text-red-800"
                    : toast.type === "warning"
                      ? "text-yellow-800"
                      : "text-blue-800"
              }`}
            >
              {toast.message}
            </p>
          </div>
          <button
            onClick={() => toastService.remove(toast.id)}
            className="text-gray-400 hover:text-gray-600 flex-shrink-0"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
};
