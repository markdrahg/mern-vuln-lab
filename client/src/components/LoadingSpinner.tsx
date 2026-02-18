import React from "react";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  message?: string;
  fullScreen?: boolean;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = "md",
  message = "Loading...",
  fullScreen = false,
}) => {
  const baseClass = fullScreen
    ? "fixed inset-0 flex items-center justify-center bg-white bg-opacity-70 z-40"
    : "flex items-center justify-center";

  const spinnerSize = {
    sm: "w-6 h-6 border-2",
    md: "w-12 h-12 border-4",
    lg: "w-16 h-16 border-4",
  };

  return (
    <div className={baseClass}>
      <div className="text-center">
        <div
          className={`${spinnerSize[size]} border-gray-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4`}
        ></div>
        {message && (
          <p className="text-gray-600 text-sm font-medium">{message}</p>
        )}
      </div>
    </div>
  );
};

export const SkeletonLoader: React.FC<{ count?: number }> = ({ count = 5 }) => {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="animate-pulse">
          <div className="h-12 bg-gray-200 rounded"></div>
        </div>
      ))}
    </div>
  );
};
