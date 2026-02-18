// Simple toast notification management
export type ToastType = "success" | "error" | "warning" | "info";

export interface Toast {
  id: string;
  type: ToastType;
  message: string;
  duration?: number;
}

// Store listeners for toast updates
let toastListeners: ((toasts: Toast[]) => void)[] = [];
let toasts: Toast[] = [];
let toastId = 0;

export const toastService = {
  addListener: (listener: (toasts: Toast[]) => void) => {
    toastListeners.push(listener);
    return () => {
      toastListeners = toastListeners.filter((l) => l !== listener);
    };
  },

  show: (message: string, type: ToastType = "info", duration = 4000) => {
    const id = String(toastId++);
    const toast: Toast = { id, type, message, duration };

    toasts = [...toasts, toast];
    toastListeners.forEach((listener) => listener(toasts));

    if (duration > 0) {
      setTimeout(() => {
        toasts = toasts.filter((t) => t.id !== id);
        toastListeners.forEach((listener) => listener(toasts));
      }, duration);
    }

    return id;
  },

  success: (message: string, duration?: number) => {
    return toastService.show(message, "success", duration);
  },

  error: (message: string, duration?: number) => {
    return toastService.show(message, "error", duration || 5000);
  },

  warning: (message: string, duration?: number) => {
    return toastService.show(message, "warning", duration || 4000);
  },

  info: (message: string, duration?: number) => {
    return toastService.show(message, "info", duration || 3000);
  },

  remove: (id: string) => {
    toasts = toasts.filter((t) => t.id !== id);
    toastListeners.forEach((listener) => listener(toasts));
  },

  clear: () => {
    toasts = [];
    toastListeners.forEach((listener) => listener(toasts));
  },
};
