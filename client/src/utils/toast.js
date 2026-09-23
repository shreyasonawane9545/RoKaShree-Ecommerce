import { toast } from "react-toastify";

const showToast = (type, message) => {
  const toastId = toast[type](message, {
    autoClose: false,
  });

  window.setTimeout(() => {
    toast.dismiss(toastId);
  }, 5000);

  return toastId;
};

export const toast5 = {
  success: (message) => showToast("success", message),
  error: (message) => showToast("error", message),
  info: (message) => showToast("info", message),
  warning: (message) => showToast("warning", message),
};